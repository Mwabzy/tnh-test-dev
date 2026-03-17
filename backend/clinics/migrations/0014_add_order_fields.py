from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("clinics", "0013_clinicalservice_title_translations"),
    ]

    operations = [
        migrations.AddField(
            model_name="clinicalservice",
            name="order",
            field=models.PositiveIntegerField(db_index=True, default=0),
        ),
        migrations.AddField(
            model_name="doctor",
            name="order",
            field=models.PositiveIntegerField(db_index=True, default=0),
        ),
    ]
