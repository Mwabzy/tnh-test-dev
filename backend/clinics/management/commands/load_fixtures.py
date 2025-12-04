import json
from datetime import datetime, UTC
from django.core.management.base import BaseCommand
from django.apps import apps
from django.contrib.auth import get_user_model
from django.db import transaction, models

User = get_user_model()

def get_unique_filter_kwargs(Model, fields):
    """
    Build dynamic filter kwargs for the model based on unique constraints in Django 5.2+.
    """

    # ✅ Handle UniqueConstraint objects defined in Meta.constraints
    unique_constraints = [
        c for c in getattr(Model._meta, "constraints", [])
        if isinstance(c, models.UniqueConstraint)
    ]

    if unique_constraints:
        # Use the first unique constraint (you can adjust if you want to support multiple)
        constraint = unique_constraints[0]
        fields_to_use = constraint.fields
        return {f: fields[f] for f in fields_to_use if f in fields}

    # ✅ Handle single-field uniqueness (unique=True)
    unique_field = next(
        (f.name for f in Model._meta.fields if f.unique and f.name in fields),
        None
    )
    if unique_field:
        return {unique_field: fields[unique_field]}

    # ✅ Heuristic fallback (for models without explicit constraints)
    for candidate in ["code", "name", "slug", "status_name", "email"]:
        if candidate in fields:
            return {candidate: fields[candidate]}

    # ❌ No unique field defined
    return {}

class Command(BaseCommand):
    help = "Load initial data from a fixture JSON file with safe insertion"

    def add_arguments(self, parser):
        parser.add_argument(
            '--file',
            type=str,
            help='Path to the fixture file',
            default='db.json'
        )

    def handle(self, *args, **options):
        file_path = options['file']
        created_count = skipped_count = error_count = 0

        try:
            with open(file_path, "r") as file:
                data = json.load(file)
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Error loading {file_path}: {e}"))
            return

        for entry in data:
            model_name = entry.get("model")
            fields = entry.get("fields", {})

            if not model_name or not fields:
                self.stdout.write(self.style.ERROR("Skipping entry with missing model or fields"))
                skipped_count += 1
                continue

            try:
                Model = apps.get_model(model_name)
                model_fields = {f.name for f in Model._meta.get_fields()}
                now = datetime.now(UTC)

                # Auto-fill timestamp present fields
                for field in ["created_at", "updated_at", "modified_at", "registration_date"]:
                    if field in model_fields:
                        fields.setdefault(field, now)

                # Handle created_by FK relation
                if "created_by" in fields:
                    try:
                        fields["created_by"] = User.objects.get(pk=fields["created_by"])
                    except User.DoesNotExist:
                        self.stderr.write(self.style.ERROR(f"User {fields['created_by']} not found. Skipping {model_name}."))
                        skipped_count += 1
                        continue

                with transaction.atomic():
                    if "pk" in entry:
                        obj, created = Model.objects.get_or_create(pk=entry["pk"], defaults=fields)
                    else:
                        # Dynamically determine uniqueness fields
                        filter_kwargs = get_unique_filter_kwargs(Model, fields)
                        if not filter_kwargs:
                            self.stderr.write(self.style.ERROR(f"No unique key found for {model_name}. Skipping."))
                            skipped_count += 1
                            continue

                        obj, created = Model.objects.get_or_create(**filter_kwargs, defaults=fields)

                if created:
                    created_count += 1
                    self.stdout.write(self.style.SUCCESS(f"Created {model_name}: {obj}"))
                else:
                    skipped_count += 1
                    self.stdout.write(self.style.WARNING(f"Already exists: {model_name} ({obj})"))

            except Exception as e:
                error_count += 1
                self.stderr.write(self.style.ERROR(f"Error processing {model_name}: {e}"))

        self.stdout.write(self.style.SUCCESS(
            f"\n✅ Done. Created: {created_count}, Skipped: {skipped_count}, Errors: {error_count}"
        ))