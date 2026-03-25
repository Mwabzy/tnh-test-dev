from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("generalinfo", "0016_add_public_statements_interviews_corporate_documents"),
    ]

    operations = [
        migrations.AddField(
            model_name="blogpost",
            name="group",
            field=models.CharField(
                blank=True, db_index=True, default="", max_length=50
            ),
        ),
        migrations.AddField(
            model_name="blogpost",
            name="type",
            field=models.CharField(blank=True, default="", max_length=50),
        ),
    ]
