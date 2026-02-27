from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = [
        ("generalinfo", "0010_csrimage"),
    ]

    operations = [
        migrations.AlterField(
            model_name="blogpost",
            name="date",
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
