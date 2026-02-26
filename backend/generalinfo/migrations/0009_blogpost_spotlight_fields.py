from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("generalinfo", "0008_appointment"),
    ]

    operations = [
        migrations.AddField(
            model_name="blogpost",
            name="spotlight_points",
            field=models.TextField(blank=True, default=""),
        ),
        migrations.AddField(
            model_name="blogpost",
            name="spotlight_points_es",
            field=models.TextField(blank=True, default=""),
        ),
        migrations.AddField(
            model_name="blogpost",
            name="spotlight_points_fr",
            field=models.TextField(blank=True, default=""),
        ),
        migrations.AddField(
            model_name="blogpost",
            name="spotlight_points_ru",
            field=models.TextField(blank=True, default=""),
        ),
        migrations.AddField(
            model_name="blogpost",
            name="spotlight_points_zh",
            field=models.TextField(blank=True, default=""),
        ),
        migrations.AddField(
            model_name="blogpost",
            name="spotlight_title",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AddField(
            model_name="blogpost",
            name="spotlight_title_es",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AddField(
            model_name="blogpost",
            name="spotlight_title_fr",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AddField(
            model_name="blogpost",
            name="spotlight_title_ru",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
        migrations.AddField(
            model_name="blogpost",
            name="spotlight_title_zh",
            field=models.CharField(blank=True, default="", max_length=255),
        ),
    ]
