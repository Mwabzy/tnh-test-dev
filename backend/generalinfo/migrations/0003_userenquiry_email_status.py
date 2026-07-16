from django.db import migrations, models


class Migration(migrations.Migration):
    """Re-adopt the email_status column.

    The column survived the migration squash in the live database but was
    dropped from the model, so every UserEnquiry insert violated its NOT NULL
    constraint. The database operation is written with IF NOT EXISTS so it
    both adopts the existing column and still creates it on a fresh database.
    """

    dependencies = [
        ("generalinfo", "0002_appointment_slot_key_include_service"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            state_operations=[
                migrations.AddField(
                    model_name="userenquiry",
                    name="email_status",
                    field=models.CharField(
                        choices=[
                            ("pending", "Pending"),
                            ("email sent", "Email sent"),
                            ("email not sent", "Email not sent"),
                        ],
                        default="pending",
                        max_length=20,
                    ),
                ),
            ],
            database_operations=[
                migrations.RunSQL(
                    sql="""
                        ALTER TABLE generalinfo_userenquiry
                        ADD COLUMN IF NOT EXISTS email_status
                        varchar(20) NOT NULL DEFAULT 'pending';
                        ALTER TABLE generalinfo_userenquiry
                        ALTER COLUMN email_status SET DEFAULT 'pending';
                    """,
                    reverse_sql="""
                        ALTER TABLE generalinfo_userenquiry
                        DROP COLUMN IF EXISTS email_status;
                    """,
                ),
            ],
        ),
    ]
