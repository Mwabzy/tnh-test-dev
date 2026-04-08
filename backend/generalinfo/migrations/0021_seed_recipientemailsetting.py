from django.db import migrations


def seed_recipient_email_settings(apps, schema_editor):
    RecipientEmailSetting = apps.get_model("generalinfo", "RecipientEmailSetting")

    defaults = {
        "Bookings": "iansmithxv@gmail.com",
        "General enquiries": "iansmithm3@gmail.com",
        "Medical enquiries": "smithke98@gmail.com",
        "School of Nursing": "morgansmithk2@gmail.com",
        "Job enquiries": "smithcarter254@gmail.com",
    }

    for category, email in defaults.items():
        RecipientEmailSetting.objects.update_or_create(
            category=category,
            defaults={"email": email},
        )


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("generalinfo", "0020_recipientemailsetting"),
    ]

    operations = [
        migrations.RunPython(seed_recipient_email_settings, noop_reverse),
    ]
