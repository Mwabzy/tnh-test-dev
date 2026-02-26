from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("clinics", "0011_clinicalserviceimage_focal_points"),
    ]

    operations = [
        migrations.AddField(
            model_name="outpatientcenter",
            name="path",
            field=models.CharField(
                blank=True,
                max_length=255,
                null=True,
                unique=True,
            ),
        ),
    ]
