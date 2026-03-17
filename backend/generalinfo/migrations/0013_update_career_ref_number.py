from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("generalinfo", "0012_add_order_field_to_team_member"),
    ]

    operations = [
        migrations.AddField(
            model_name="career",
            name="reference_number",
            field=models.CharField(blank=True, default="", max_length=100),
        ),
        migrations.RemoveField(
            model_name="career",
            name="description",
        ),
        migrations.RemoveField(
            model_name="career",
            name="description_es",
        ),
        migrations.RemoveField(
            model_name="career",
            name="description_fr",
        ),
        migrations.RemoveField(
            model_name="career",
            name="description_ru",
        ),
        migrations.RemoveField(
            model_name="career",
            name="description_zh",
        ),
        migrations.RemoveField(
            model_name="career",
            name="requirements",
        ),
        migrations.RemoveField(
            model_name="career",
            name="requirements_es",
        ),
        migrations.RemoveField(
            model_name="career",
            name="requirements_fr",
        ),
        migrations.RemoveField(
            model_name="career",
            name="requirements_ru",
        ),
        migrations.RemoveField(
            model_name="career",
            name="requirements_zh",
        ),
    ]
