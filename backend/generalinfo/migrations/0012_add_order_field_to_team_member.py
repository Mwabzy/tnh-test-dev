from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("generalinfo", "0011_alter_blogpost_date"),
    ]

    operations = [
        migrations.AddField(
            model_name="teammember",
            name="order",
            field=models.PositiveIntegerField(db_index=True, default=0),
        ),
    ]
