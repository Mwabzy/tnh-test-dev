from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.test import TestCase, override_settings
from rest_framework.test import APITestCase

from clinics.models import ClinicalService
from clinics.translation import (
    TranslationEngine,
    auto_translate_missing_clinical_service_fields,
)


def _fake_provider_response(*args, **kwargs):
    text = kwargs.get("text")
    target_lang = kwargs.get("target_lang")

    if text is None and args:
        text = args[0]
    if target_lang is None and len(args) > 1:
        target_lang = args[1]

    return f"{target_lang}:{text}"


class ClinicalServiceAutoTranslationUnitTests(TestCase):
    def setUp(self):
        cache.clear()

    @override_settings(AUTO_TRANSLATE_ON_SAVE=False)
    @patch("clinics.translation.TranslationEngine._call_provider")
    def test_feature_flag_disabled_keeps_payload_unchanged(self, mock_provider):
        payload = {
            "title": "Cardiology",
            "tagline": "Heart experts",
            "overview": "<p>Advanced diagnostics</p>",
            "detailedDescription": "<div>In-depth details</div>",
        }

        result = auto_translate_missing_clinical_service_fields(payload.copy())

        self.assertEqual(result, payload)
        mock_provider.assert_not_called()

    @override_settings(
        AUTO_TRANSLATE_ON_SAVE=True,
        AUTO_TRANSLATE_RATE_LIMIT_MAX_CALLS=1000,
    )
    @patch(
        "clinics.translation.TranslationEngine._call_provider",
        side_effect=_fake_provider_response,
    )
    def test_backfills_missing_translations_without_overwriting_existing(self, _mock_provider):
        payload = {
            "title": "Cardiology",
            "tagline": "Heart experts",
            "tagline_fr": "Traduction manuelle",
            "overview": "<p>Hello <strong>World</strong></p>",
            "detailedDescription": "<div>Detailed text</div>",
        }

        result = auto_translate_missing_clinical_service_fields(payload.copy())

        self.assertEqual(result["tagline_fr"], "Traduction manuelle")
        self.assertEqual(result["title_es"], "es:Cardiology")
        self.assertEqual(result["title_ru"], "ru:Cardiology")
        self.assertEqual(result["tagline_zh"], "zh:Heart experts")
        self.assertIn("<p>", result["overview_fr"])
        self.assertIn("</p>", result["overview_fr"])
        self.assertIn("<strong>fr:World</strong>", result["overview_fr"])
        self.assertIn("<div>", result["detailedDescription_fr"])

    @override_settings(
        AUTO_TRANSLATE_ON_SAVE=True,
        AUTO_TRANSLATE_RATE_LIMIT_MAX_CALLS=1000,
    )
    @patch(
        "clinics.translation.TranslationEngine._call_provider",
        side_effect=_fake_provider_response,
    )
    def test_backfills_missing_feature_translations_without_overwriting_existing(self, _mock_provider):
        payload = {
            "title": "Cardiology",
            "tagline": "Heart experts",
            "overview": "<p>Advanced diagnostics</p>",
            "detailedDescription": "<p>In-depth details</p>",
            "features": [
                {
                    "title": "Fast triage",
                    "title_fr": "Triage manuel",
                    "description": "<p>Immediate assessment</p>",
                }
            ],
        }

        result = auto_translate_missing_clinical_service_fields(payload.copy())
        first_feature = result["features"][0]

        self.assertEqual(first_feature["title_fr"], "Triage manuel")
        self.assertEqual(first_feature["title_es"], "es:Fast triage")
        self.assertIn("<p>", first_feature["description_fr"])
        self.assertIn("fr:Immediate assessment", first_feature["description_fr"])

    @override_settings(
        AUTO_TRANSLATE_ON_SAVE=True,
        AUTO_TRANSLATE_RATE_LIMIT_MAX_CALLS=1000,
    )
    @patch(
        "clinics.translation.TranslationEngine._call_provider",
        side_effect=_fake_provider_response,
    )
    def test_update_does_not_clear_existing_translation_when_blank_is_sent(self, _mock_provider):
        instance = ClinicalService.objects.create(
            title="Orthopedics",
            tagline="Bone care",
            tagline_fr="Orthopedie existante",
            overview="<p>Overview</p>",
            detailedDescription="<p>Details</p>",
        )
        update_payload = {
            "tagline": "Updated english tagline",
            "tagline_fr": "",
        }

        result = auto_translate_missing_clinical_service_fields(
            update_payload.copy(),
            instance=instance,
        )

        self.assertNotIn("tagline_fr", result)
        self.assertEqual(result["tagline_es"], "es:Updated english tagline")

    @override_settings(
        AUTO_TRANSLATE_ON_SAVE=True,
        AUTO_TRANSLATE_RATE_LIMIT_MAX_CALLS=1000,
    )
    @patch(
        "clinics.translation.TranslationEngine._call_provider",
        side_effect=_fake_provider_response,
    )
    def test_update_features_preserves_existing_translation_when_blank_is_sent(self, _mock_provider):
        instance = ClinicalService.objects.create(
            title="Orthopedics",
            tagline="Bone care",
            overview="<p>Overview</p>",
            detailedDescription="<p>Details</p>",
            features=[
                {
                    "title": "Fracture care",
                    "title_fr": "Prise en charge des fractures",
                    "description": "<p>24/7 support</p>",
                    "description_fr": "<p>Support 24h/24</p>",
                }
            ],
        )
        update_payload = {
            "features": [
                {
                    "title": "Fracture care",
                    "title_fr": "",
                    "description": "<p>24/7 support updated</p>",
                    "description_fr": "",
                }
            ]
        }

        result = auto_translate_missing_clinical_service_fields(
            update_payload.copy(),
            instance=instance,
        )
        first_feature = result["features"][0]

        self.assertEqual(first_feature["title_fr"], "Prise en charge des fractures")
        self.assertEqual(first_feature["description_fr"], "<p>Support 24h/24</p>")
        self.assertEqual(first_feature["title_es"], "es:Fracture care")
        self.assertIn("es:24/7 support updated", first_feature["description_es"])

    @override_settings(
        AUTO_TRANSLATE_CACHE_TTL_SECONDS=300,
        AUTO_TRANSLATE_RATE_LIMIT_MAX_CALLS=1000,
    )
    @patch("clinics.translation.TranslationEngine._call_provider", return_value="Bonjour")
    def test_translation_engine_uses_cache_for_repeated_text(self, mock_provider):
        engine = TranslationEngine()

        first = engine.translate("Hello", target_lang="fr")
        second = engine.translate("Hello", target_lang="fr")

        self.assertEqual(first, "Bonjour")
        self.assertEqual(second, "Bonjour")
        self.assertEqual(mock_provider.call_count, 1)

    @override_settings(
        AUTO_TRANSLATE_RATE_LIMIT_WINDOW_SECONDS=60,
        AUTO_TRANSLATE_RATE_LIMIT_MAX_CALLS=1,
        AUTO_TRANSLATE_CACHE_TTL_SECONDS=300,
    )
    @patch(
        "clinics.translation.TranslationEngine._call_provider",
        side_effect=_fake_provider_response,
    )
    def test_translation_engine_rate_limits_and_falls_back_to_source(self, mock_provider):
        engine = TranslationEngine()

        first = engine.translate("First text", target_lang="fr")
        second = engine.translate("Second text", target_lang="fr")

        self.assertEqual(first, "fr:First text")
        self.assertEqual(second, "Second text")
        self.assertEqual(mock_provider.call_count, 1)


class ClinicalServiceAutoTranslationIntegrationTests(APITestCase):
    def setUp(self):
        cache.clear()
        user_model = get_user_model()
        self.user = user_model.objects.create_user(
            username="translator-admin",
            email="translator-admin@example.com",
            password="SafePass123!",
        )
        self.client.force_authenticate(user=self.user)

    @override_settings(
        AUTO_TRANSLATE_ON_SAVE=True,
        AUTO_TRANSLATE_RATE_LIMIT_MAX_CALLS=1000,
    )
    @patch(
        "clinics.translation.TranslationEngine._call_provider",
        side_effect=_fake_provider_response,
    )
    def test_create_endpoint_auto_translates_missing_fields(self, _mock_provider):
        payload = {
            "title": "Accident and Emergency",
            "tagline": "Rapid response care",
            "tagline_fr": "Traduction conservee",
            "overview": "<p>Emergency support</p>",
            "detailedDescription": "<p>Round-the-clock treatment</p>",
        }

        response = self.client.post(
            "/api/v1/clinical-services/",
            data=payload,
            format="multipart",
        )

        self.assertEqual(response.status_code, 201, response.data)
        service = ClinicalService.objects.get(pk=response.data["id"])

        self.assertEqual(service.tagline_fr, "Traduction conservee")
        self.assertEqual(service.title_es, "es:Accident and Emergency")
        self.assertEqual(service.title_ru, "ru:Accident and Emergency")
        self.assertIn("<p>", service.overview_fr)
        self.assertIn("fr:Emergency support", service.overview_fr)

    @override_settings(
        AUTO_TRANSLATE_ON_SAVE=True,
        AUTO_TRANSLATE_RATE_LIMIT_MAX_CALLS=1000,
    )
    @patch(
        "clinics.translation.TranslationEngine._call_provider",
        side_effect=_fake_provider_response,
    )
    def test_create_endpoint_auto_translates_feature_fields(self, _mock_provider):
        payload = {
            "title": "Accident and Emergency",
            "tagline": "Rapid response care",
            "overview": "<p>Emergency support</p>",
            "detailedDescription": "<p>Round-the-clock treatment</p>",
            "features": (
                '[{"title":"Fast triage","description":"<p>Immediate assessment</p>"}]'
            ),
        }

        response = self.client.post(
            "/api/v1/clinical-services/",
            data=payload,
            format="multipart",
        )

        self.assertEqual(response.status_code, 201, response.data)
        service = ClinicalService.objects.get(pk=response.data["id"])

        self.assertIsInstance(service.features, list)
        self.assertEqual(service.features[0]["title_fr"], "fr:Fast triage")
        self.assertIn("<p>", service.features[0]["description_es"])
        self.assertIn("es:Immediate assessment", service.features[0]["description_es"])

    @override_settings(
        AUTO_TRANSLATE_ON_SAVE=True,
        AUTO_TRANSLATE_RATE_LIMIT_MAX_CALLS=1000,
    )
    @patch(
        "clinics.translation.TranslationEngine._call_provider",
        side_effect=_fake_provider_response,
    )
    def test_translate_preview_endpoint_returns_translations(self, _mock_provider):
        payload = {
            "title": "Cardiology",
            "overview": "<p>Heart care</p>",
            "features": [
                {"title": "Fast triage", "description": "<p>Immediate assessment</p>"}
            ],
        }

        response = self.client.post(
            "/api/v1/clinical-services/translate-preview/",
            data=payload,
            format="json",
        )

        self.assertEqual(response.status_code, 200, response.data)
        self.assertEqual(response.data["title"]["fr"], "fr:Cardiology")
        self.assertIn("<p>", response.data["overview"]["fr"])
        self.assertIn("fr:Heart care", response.data["overview"]["fr"])
        self.assertEqual(response.data["features"][0]["title"]["fr"], "fr:Fast triage")
        self.assertIn(
            "fr:Immediate assessment",
            response.data["features"][0]["description"]["fr"],
        )
