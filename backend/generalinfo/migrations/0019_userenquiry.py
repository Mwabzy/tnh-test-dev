import uuid

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("generalinfo", "0018_backfill_blogpost_group_type"),
    ]

    operations = [
        migrations.CreateModel(
            name="UserEnquiry",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("Bookings", "Bookings"),
                            ("General enquiries", "General enquiries"),
                            ("Medical enquiries", "Medical enquiries"),
                            ("School of Nursing", "School of Nursing"),
                            ("Job enquiries", "Job enquiries"),
                        ],
                        db_index=True,
                        max_length=100,
                    ),
                ),
                ("full_name", models.CharField(max_length=255)),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.CharField(blank=True, max_length=50)),
                ("message", models.TextField(blank=True)),
                ("recipient_email", models.EmailField(max_length=254)),
                ("service", models.CharField(blank=True, max_length=255)),
                ("doctor", models.CharField(blank=True, max_length=255)),
                ("location", models.CharField(blank=True, max_length=255)),
                ("appointment_date", models.DateField(blank=True, null=True)),
                ("appointment_time", models.TimeField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
    ]
