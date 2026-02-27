import hashlib
import logging
import re
import time

import requests
from django.conf import settings
from django.core.cache import cache

logger = logging.getLogger(__name__)

TARGET_LANGUAGES = ("fr", "es", "zh", "ru")

TRANSLATABLE_FIELDS = {
    "title": {"html": False},
    "tagline": {"html": False},
    "overview": {"html": True},
    "detailedDescription": {"html": True},
}

FEATURE_TRANSLATABLE_FIELDS = {
    "title": {"html": False},
    "description": {"html": True},
}

_HTML_TAG_RE = re.compile(r"(<[^>]+>)")
_MISSING = object()


def _is_blank(value):
    if value is None:
        return True
    if isinstance(value, str):
        return value.strip() == ""
    return False


class TranslationEngine:
    """
    Lightweight translation wrapper with request throttling and cache.
    Uses a public translation endpoint by default and degrades gracefully.
    """

    def __init__(self):
        self.provider_url = getattr(
            settings,
            "AUTO_TRANSLATE_PROVIDER_URL",
            "https://translate.googleapis.com/translate_a/single",
        )
        self.timeout_seconds = float(
            getattr(settings, "AUTO_TRANSLATE_TIMEOUT_SECONDS", 8.0)
        )
        self.cache_ttl_seconds = int(
            getattr(settings, "AUTO_TRANSLATE_CACHE_TTL_SECONDS", 60 * 60 * 24)
        )
        self.rate_limit_window_seconds = int(
            getattr(settings, "AUTO_TRANSLATE_RATE_LIMIT_WINDOW_SECONDS", 60)
        )
        self.rate_limit_max_calls = int(
            getattr(settings, "AUTO_TRANSLATE_RATE_LIMIT_MAX_CALLS", 200)
        )

    def translate(self, text, target_lang, is_html=False, source_lang="en"):
        if _is_blank(text):
            return text
        if is_html:
            return self._translate_html(
                html_text=text,
                target_lang=target_lang,
                source_lang=source_lang,
            )
        return self._translate_plain_text(
            text=text,
            target_lang=target_lang,
            source_lang=source_lang,
        )

    def _translate_html(self, html_text, target_lang, source_lang="en"):
        parts = re.split(_HTML_TAG_RE, html_text)
        translated_parts = []

        for part in parts:
            if part == "":
                continue
            if part.startswith("<") and part.endswith(">"):
                translated_parts.append(part)
                continue
            translated_parts.append(
                self._translate_text_segment(
                    text=part,
                    target_lang=target_lang,
                    source_lang=source_lang,
                )
            )

        return "".join(translated_parts)

    def _translate_text_segment(self, text, target_lang, source_lang="en"):
        if _is_blank(text):
            return text

        leading_count = len(text) - len(text.lstrip())
        trailing_count = len(text) - len(text.rstrip())

        leading = text[:leading_count]
        trailing = text[len(text) - trailing_count :] if trailing_count else ""
        core_end = len(text) - trailing_count if trailing_count else len(text)
        core = text[leading_count:core_end]

        if _is_blank(core):
            return text

        translated_core = self._translate_plain_text(
            text=core,
            target_lang=target_lang,
            source_lang=source_lang,
        )
        return f"{leading}{translated_core}{trailing}"

    def _translate_plain_text(self, text, target_lang, source_lang="en"):
        cache_key = self._cache_key(text=text, target_lang=target_lang, source_lang=source_lang)
        cached = cache.get(cache_key)
        if isinstance(cached, str):
            return cached

        if not self._consume_rate_limit():
            logger.warning(
                "Auto-translation rate limit reached. Returning source text for lang=%s",
                target_lang,
            )
            return text

        translated = self._call_provider(
            text=text,
            target_lang=target_lang,
            source_lang=source_lang,
        )

        if _is_blank(translated):
            translated = text

        cache.set(cache_key, translated, timeout=self.cache_ttl_seconds)
        return translated

    def _consume_rate_limit(self):
        if self.rate_limit_max_calls <= 0:
            return True

        window = max(self.rate_limit_window_seconds, 1)
        bucket = int(time.time()) // window
        key = f"clinics:auto-translate:rate:{bucket}"

        if cache.add(key, 1, timeout=window + 1):
            return True

        try:
            current = cache.incr(key)
        except ValueError:
            cache.set(key, 1, timeout=window + 1)
            current = 1

        return current <= self.rate_limit_max_calls

    def _cache_key(self, text, target_lang, source_lang):
        digest = hashlib.sha256(text.encode("utf-8")).hexdigest()
        return f"clinics:auto-translate:v1:{source_lang}:{target_lang}:{digest}"

    def _call_provider(self, text, target_lang, source_lang="en"):
        try:
            response = requests.get(
                self.provider_url,
                params={
                    "client": "gtx",
                    "sl": source_lang,
                    "tl": target_lang,
                    "dt": "t",
                    "q": text,
                },
                timeout=self.timeout_seconds,
            )
            response.raise_for_status()
            return self._parse_provider_response(response.json())
        except Exception:
            logger.exception(
                "Auto-translation request failed. Returning source text for lang=%s",
                target_lang,
            )
            return text

    @staticmethod
    def _parse_provider_response(payload):
        if not isinstance(payload, list) or not payload:
            return ""

        first_block = payload[0]
        if not isinstance(first_block, list):
            return ""

        parts = []
        for item in first_block:
            if isinstance(item, list) and item:
                segment = item[0]
                if isinstance(segment, str):
                    parts.append(segment)

        return "".join(parts)


def auto_translate_missing_clinical_service_fields(validated_data, instance=None):
    """
    Fill missing ClinicalService translation fields from English source values.
    Existing non-empty translations are preserved.
    """
    if not getattr(settings, "AUTO_TRANSLATE_ON_SAVE", False):
        return validated_data

    translator = TranslationEngine()

    for source_field, config in TRANSLATABLE_FIELDS.items():
        source_value = validated_data.get(source_field, _MISSING)
        if source_value is _MISSING and instance is not None:
            source_value = getattr(instance, source_field, None)

        if _is_blank(source_value):
            continue

        is_html = bool(config.get("html"))

        for lang in TARGET_LANGUAGES:
            translated_field = f"{source_field}_{lang}"
            existing_value = getattr(instance, translated_field, None) if instance is not None else None
            incoming_value = validated_data.get(translated_field, _MISSING)

            # Preserve existing value unless user provided a non-empty explicit update.
            if not _is_blank(existing_value):
                if incoming_value is _MISSING or _is_blank(incoming_value):
                    validated_data.pop(translated_field, None)
                    continue

            # Respect explicit non-empty user input.
            if incoming_value is not _MISSING and not _is_blank(incoming_value):
                continue

            translated_value = translator.translate(
                text=source_value,
                target_lang=lang,
                is_html=is_html,
            )

            if _is_blank(translated_value):
                continue

            validated_data[translated_field] = translated_value

    incoming_features = validated_data.get("features", _MISSING)
    if incoming_features is _MISSING or not isinstance(incoming_features, list):
        return validated_data

    existing_features = []
    if instance is not None and isinstance(getattr(instance, "features", None), list):
        existing_features = instance.features

    translated_features = []
    for index, feature in enumerate(incoming_features):
        if not isinstance(feature, dict):
            translated_features.append(feature)
            continue

        existing_feature = {}
        if index < len(existing_features) and isinstance(existing_features[index], dict):
            existing_feature = existing_features[index]

        translated_feature = dict(feature)

        for source_field, config in FEATURE_TRANSLATABLE_FIELDS.items():
            source_value = translated_feature.get(source_field, _MISSING)
            if source_value is _MISSING:
                source_value = existing_feature.get(source_field)

            if _is_blank(source_value):
                continue

            is_html = bool(config.get("html"))

            for lang in TARGET_LANGUAGES:
                translated_field = f"{source_field}_{lang}"
                existing_value = existing_feature.get(translated_field)
                incoming_value = translated_feature.get(translated_field, _MISSING)

                # Preserve existing non-empty translation when request sends blank/missing.
                if not _is_blank(existing_value):
                    if incoming_value is _MISSING or _is_blank(incoming_value):
                        translated_feature[translated_field] = existing_value
                        continue

                # Respect explicit non-empty user input.
                if incoming_value is not _MISSING and not _is_blank(incoming_value):
                    continue

                translated_value = translator.translate(
                    text=source_value,
                    target_lang=lang,
                    is_html=is_html,
                )

                if _is_blank(translated_value):
                    continue

                translated_feature[translated_field] = translated_value

        translated_features.append(translated_feature)

    validated_data["features"] = translated_features

    return validated_data


def build_clinical_service_translation_preview(payload):
    """
    Build translation preview for provided English source fields.
    Returns:
      {
        "title": {"fr": "...", "es": "...", ...},
        "overview": {"fr": "<p>...</p>", ...},
      }
    """
    if not getattr(settings, "AUTO_TRANSLATE_ON_SAVE", False):
        return {}

    translator = TranslationEngine()
    preview = {}

    for source_field, config in TRANSLATABLE_FIELDS.items():
        source_value = payload.get(source_field)
        if _is_blank(source_value):
            continue

        is_html = bool(config.get("html"))
        translated = {}

        for lang in TARGET_LANGUAGES:
            translated_value = translator.translate(
                text=source_value,
                target_lang=lang,
                is_html=is_html,
            )
            if not _is_blank(translated_value):
                translated[lang] = translated_value

        if translated:
            preview[source_field] = translated

    features_payload = payload.get("features")
    if isinstance(features_payload, list):
        features_preview = []
        for feature in features_payload:
            if not isinstance(feature, dict):
                features_preview.append({})
                continue

            feature_preview = {}
            for source_field, config in FEATURE_TRANSLATABLE_FIELDS.items():
                source_value = feature.get(source_field)
                if _is_blank(source_value):
                    continue

                is_html = bool(config.get("html"))
                translated = {}

                for lang in TARGET_LANGUAGES:
                    translated_value = translator.translate(
                        text=source_value,
                        target_lang=lang,
                        is_html=is_html,
                    )
                    if not _is_blank(translated_value):
                        translated[lang] = translated_value

                if translated:
                    feature_preview[source_field] = translated

            features_preview.append(feature_preview)

        preview["features"] = features_preview

    return preview
