from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("generalinfo", "0005_career_file"),
    ]

    operations = [
        migrations.AddField(
            model_name="career",
            name="closing_date",
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="career",
            name="opportunity_type",
            field=models.CharField(blank=True, default="", max_length=50),
        ),
        migrations.AlterField(
            model_name="career",
            name="posted_date",
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
