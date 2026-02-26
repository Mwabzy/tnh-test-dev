from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("generalinfo", "0009_blogpost_spotlight_fields"),
    ]

    operations = [
        migrations.CreateModel(
            name="CSRImage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("image", models.ImageField(upload_to="csr/images/")),
                ("alt", models.CharField(blank=True, default="", max_length=255)),
                (
                    "csr",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="uploaded_images",
                        to="generalinfo.csr",
                    ),
                ),
            ],
        ),
    ]

