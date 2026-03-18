import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("generalinfo", "0015_update_tender_publish_remove_fields"),
    ]

    operations = [
        migrations.CreateModel(
            name="PublicStatement",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        primary_key=True,
                        default=uuid.uuid4,
                        editable=False,
                        serialize=False,
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("is_published", models.BooleanField(default=True, db_index=True)),
                (
                    "file",
                    models.FileField(
                        upload_to="public_statements/",
                        blank=True,
                        null=True,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="Interview",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        primary_key=True,
                        default=uuid.uuid4,
                        editable=False,
                        serialize=False,
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("video_url", models.URLField(max_length=500)),
                ("is_published", models.BooleanField(default=True, db_index=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="CorporateDocument",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        primary_key=True,
                        default=uuid.uuid4,
                        editable=False,
                        serialize=False,
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("is_published", models.BooleanField(default=True, db_index=True)),
                (
                    "file",
                    models.FileField(
                        upload_to="corporate_documents/",
                        blank=True,
                        null=True,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
