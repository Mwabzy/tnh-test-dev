from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("clinics", "0004_clinicalservice_path"),
    ]

    operations = [
        migrations.AlterField(
            model_name="clinicalservice",
            name="path",
            field=models.CharField(blank=True, max_length=255, null=True, unique=True),
        ),
    ]
