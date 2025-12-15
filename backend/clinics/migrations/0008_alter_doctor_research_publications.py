from django.db import migrations, models
import json

def migrate_string_to_json(apps, schema_editor):
    Doctor = apps.get_model('clinics', 'Doctor')
    for doc in Doctor.objects.all():
        # Convert research_publications
        if isinstance(doc.research_publications, str) and doc.research_publications:
            doc.research_publications_temp = [doc.research_publications]
        else:
            doc.research_publications_temp = doc.research_publications or []

        # Convert awards
        if isinstance(doc.awards, str) and doc.awards:
            doc.awards_temp = [doc.awards]
        else:
            doc.awards_temp = doc.awards or []

        doc.save()

class Migration(migrations.Migration):

    dependencies = [
        ('clinics', '0007_alter_clinicalservice_doctors'),
    ]

    operations = [
        # Step 1: Add temporary JSON fields
        migrations.AddField(
            model_name='doctor',
            name='research_publications_temp',
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name='doctor',
            name='awards_temp',
            field=models.JSONField(blank=True, default=list),
        ),

        # Step 2: Migrate existing data
        migrations.RunPython(migrate_string_to_json, reverse_code=migrations.RunPython.noop),

        # Step 3: Remove old string fields
        migrations.RemoveField(
            model_name='doctor',
            name='research_publications',
        ),
        migrations.RemoveField(
            model_name='doctor',
            name='awards',
        ),

        # Step 4: Rename temp fields to original names
        migrations.RenameField(
            model_name='doctor',
            old_name='research_publications_temp',
            new_name='research_publications',
        ),
        migrations.RenameField(
            model_name='doctor',
            old_name='awards_temp',
            new_name='awards',
        ),
    ]
