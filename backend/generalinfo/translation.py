from django.conf import settings

from clinics.translation import TARGET_LANGUAGES, TranslationEngine

_MISSING = object()

BLOGPOST_TRANSLATABLE_FIELDS = {
    "title": {"html": False},
    "subtitle": {"html": False},
    "blog_subtitle": {"html": False},
    "short_desc": {"html": True},
    "long_desc": {"html": True},
    "spotlight_title": {"html": False},
    "spotlight_points": {"html": True},
    "category": {"html": False},
}

CSR_TRANSLATABLE_FIELDS = {
    "title": {"html": False},
    "subtitle": {"html": False},
    "blog_subtitle": {"html": False},
    "description": {"html": True},
    "short_desc": {"html": True},
    "long_desc": {"html": True},
}


def _is_blank(value):
    if value is None:
        return True
    if isinstance(value, str):
        return value.strip() == ""
    return False


def _auto_translate_model_fields(
    validated_data,
    field_config,
    instance=None,
    translator=None,
):
    translator = translator or TranslationEngine()

    for source_field, config in field_config.items():
        source_value = validated_data.get(source_field, _MISSING)
        if source_value is _MISSING and instance is not None:
            source_value = getattr(instance, source_field, None)
        if source_value is _MISSING:
            continue

        if _is_blank(source_value):
            continue

        is_html = bool(config.get("html"))

        for lang in TARGET_LANGUAGES:
            translated_field = f"{source_field}_{lang}"
            existing_value = (
                getattr(instance, translated_field, None)
                if instance is not None
                else None
            )
            incoming_value = validated_data.get(translated_field, _MISSING)

            if not _is_blank(existing_value):
                if incoming_value is _MISSING or _is_blank(incoming_value):
                    validated_data.pop(translated_field, None)
                    continue

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

    return validated_data


def _build_translation_preview_from_fields(payload, field_config, translator=None):
    translator = translator or TranslationEngine()
    preview = {}

    for source_field, config in field_config.items():
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

    return preview


def auto_translate_missing_blogpost_fields(validated_data, instance=None):
    if not getattr(settings, "AUTO_TRANSLATE_ON_SAVE", False):
        return validated_data

    return _auto_translate_model_fields(
        validated_data=validated_data,
        field_config=BLOGPOST_TRANSLATABLE_FIELDS,
        instance=instance,
    )


def auto_translate_missing_csr_fields(validated_data, instance=None):
    if not getattr(settings, "AUTO_TRANSLATE_ON_SAVE", False):
        return validated_data

    return _auto_translate_model_fields(
        validated_data=validated_data,
        field_config=CSR_TRANSLATABLE_FIELDS,
        instance=instance,
    )


def build_blogpost_translation_preview(payload):
    if not getattr(settings, "AUTO_TRANSLATE_ON_SAVE", False):
        return {}

    return _build_translation_preview_from_fields(
        payload=payload,
        field_config=BLOGPOST_TRANSLATABLE_FIELDS,
    )


def build_csr_translation_preview(payload):
    if not getattr(settings, "AUTO_TRANSLATE_ON_SAVE", False):
        return {}

    return _build_translation_preview_from_fields(
        payload=payload,
        field_config=CSR_TRANSLATABLE_FIELDS,
    )
