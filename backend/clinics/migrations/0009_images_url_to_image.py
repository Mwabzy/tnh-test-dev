from django.db import migrations


def migrate_images_url_to_image(apps, schema_editor):
    ClinicalService = apps.get_model("clinics", "ClinicalService")

    for service in ClinicalService.objects.all():
        images = service.images

        if not images or not isinstance(images, list):
            continue

        new_images = []
        changed = False

        for img in images:
            if not isinstance(img, dict):
                continue

            # If already migrated, keep as-is
            if "image" in img:
                new_images.append(img)
                continue

            # Migrate url → image
            if "url" in img:
                new_images.append({
                    "image": img.get("url"),
                    "alt": img.get("alt", "")
                })
                changed = True
            else:
                new_images.append(img)

        if changed:
            service.images = new_images
            service.save(update_fields=["images"])


class Migration(migrations.Migration):

    dependencies = [
        ("clinics", "0008_alter_doctor_research_publications"),
    ]

    operations = [
        migrations.RunPython(migrate_images_url_to_image),
    ]
