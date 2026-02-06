from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("generalinfo", "0004_career"),
    ]

    operations = [
        migrations.AddField(
            model_name="career",
            name="file",
            field=models.FileField(blank=True, null=True, upload_to="careers/"),
        ),
    ]
