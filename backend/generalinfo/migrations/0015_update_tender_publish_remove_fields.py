from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("generalinfo", "0014_add_career_publish_state"),
    ]

    operations = [
        migrations.AddField(
            model_name="tender",
            name="is_published",
            field=models.BooleanField(db_index=True, default=True),
        ),
        migrations.RemoveField(
            model_name="tender",
            name="description",
        ),
        migrations.RemoveField(
            model_name="tender",
            name="opportunity_type",
        ),
    ]
