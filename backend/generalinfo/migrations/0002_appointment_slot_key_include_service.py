import re

from django.db import migrations


def _normalize(value):
    return re.sub(r"\s+", " ", (value or "").strip().lower())


def add_service_to_slot_key(apps, schema_editor):
    Appointment = apps.get_model("generalinfo", "Appointment")
    for appointment in Appointment.objects.all():
        appointment.slot_key = "|".join(
            [
                _normalize(appointment.service),
                _normalize(appointment.location),
                appointment.appointment_date.isoformat(),
                appointment.appointment_time.strftime("%H:%M"),
            ]
        )
        appointment.save(update_fields=["slot_key"])


def remove_service_from_slot_key(apps, schema_editor):
    Appointment = apps.get_model("generalinfo", "Appointment")
    for appointment in Appointment.objects.all():
        appointment.slot_key = "|".join(
            [
                _normalize(appointment.location),
                appointment.appointment_date.isoformat(),
                appointment.appointment_time.strftime("%H:%M"),
            ]
        )
        appointment.save(update_fields=["slot_key"])


class Migration(migrations.Migration):

    dependencies = [
        ("generalinfo", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(add_service_to_slot_key, remove_service_from_slot_key),
    ]
