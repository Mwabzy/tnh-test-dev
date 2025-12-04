from django.db import migrations, models
import json

def migrate_contact_to_temp(apps, schema_editor):
    ClinicalService = apps.get_model('clinics', 'ClinicalService')
    for service in ClinicalService.objects.all():
        if service.contact:
            # Convert the contact field
            contact_instance = service.contact 
            contact_data = {
                "phone": contact_instance.phone if contact_instance else None,
                "email": contact_instance.email if contact_instance else None,
                "address": contact_instance.address if contact_instance else None,
            }
            # Save it into the new temporary JSON field
            service.contact_temp = json.dumps(contact_data)
            service.save()

class Migration(migrations.Migration):

    dependencies = [
        ('clinics', '0002_remove_clinicalservice_related_services_and_more'),  # Correct previous migration
    ]

    operations = [
        # Add the new temporary contact_temp field with JSONB type
        migrations.AddField(
            model_name='clinicalservice',
            name='contact_temp',
            field=models.JSONField(blank=True, null=True),
        ),
        # Migrate the data from the old contact field to the new contact_temp field
        migrations.RunPython(migrate_contact_to_temp),
    ]
