from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("clinics", "0012_outpatientcenter_path"),
    ]

    operations = [
        migrations.AddField(
            model_name="clinicalservice",
            name="title_es",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="clinicalservice",
            name="title_fr",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="clinicalservice",
            name="title_ru",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="clinicalservice",
            name="title_zh",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
