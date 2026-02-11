from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("clinics", "0003_clinicalfaq"),
    ]

    operations = [
        migrations.AddField(
            model_name="clinicalservice",
            name="path",
            field=models.SlugField(blank=True, max_length=200, null=True, unique=True),
        ),
    ]
