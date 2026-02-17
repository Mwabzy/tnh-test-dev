from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("clinics", "0006_merge_0004_roomward_0005_alter_clinicalservice_path"),
        (
            "clinics",
            "0006_merge_0005_alter_clinicalservice_path_0005_roomward_features",
        ),
    ]

    operations = [
        migrations.AddField(
            model_name="clinicalservice",
            name="ftOnHomepage",
            field=models.BooleanField(default=False),
        ),
    ]
