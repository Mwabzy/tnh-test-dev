from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("clinics", "0007_clinicalservice_ft_on_homepage"),
    ]

    operations = [
        migrations.CreateModel(
            name="OutpatientCenterImage",
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
                ("image", models.ImageField(upload_to="outpatient_centers/")),
                ("alt", models.CharField(blank=True, default="", max_length=255)),
                (
                    "outpatient_center",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="uploaded_images",
                        to="clinics.outpatientcenter",
                    ),
                ),
            ],
        ),
    ]
