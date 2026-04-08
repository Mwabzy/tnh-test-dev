from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("generalinfo", "0019_userenquiry"),
    ]

    operations = [
        migrations.CreateModel(
            name="RecipientEmailSetting",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("Bookings", "Bookings"),
                            ("General enquiries", "General enquiries"),
                            ("Medical enquiries", "Medical enquiries"),
                            ("School of Nursing", "School of Nursing"),
                            ("Job enquiries", "Job enquiries"),
                        ],
                        max_length=100,
                        unique=True,
                    ),
                ),
                ("email", models.EmailField(max_length=254)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["category"]},
        ),
    ]
