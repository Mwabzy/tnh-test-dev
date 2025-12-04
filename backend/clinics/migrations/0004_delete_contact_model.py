from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('clinics', '0003_alter_clinicalservice_contact'),  
    ]

    operations = [
        # Remove the old contact column
        migrations.RemoveField(
            model_name='clinicalservice',
            name='contact',
        ),
        # Rename the temporary column to contact
        migrations.RenameField(
            model_name='clinicalservice',
            old_name='contact_temp',
            new_name='contact',
        ),
    ]
