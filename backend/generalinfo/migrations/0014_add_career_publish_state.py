from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("generalinfo", "0013_update_career_ref_number"),
    ]

    operations = [
        migrations.AddField(
            model_name="career",
            name="is_published",
            field=models.BooleanField(db_index=True, default=True),
        ),
    ]
