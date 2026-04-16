import json
import os
from django.core.management.base import BaseCommand
from generalinfo.models import BlogPost, TeamMember, CSR, Career  # Import your models

class Command(BaseCommand):
    help = 'Generate Intlayer dictionaries from translated model data'

    def handle(self, *args, **options):
        locales = ['en', 'fr', 'es', 'zh', 'ru']
        frontend_dict_path = os.path.join(os.path.dirname(__file__), '../../../../../frontend/.intlayer/dictionary')
        os.makedirs(frontend_dict_path, exist_ok=True)

        # Define mappings: Intlayer module name -> Model and query/filter logic
        mappings = {
            'aboutCollege': {
                'model': BlogPost,
                'filter': {'category': 'about_college'},  # Example filter; adjust as needed
                'fields': ['title', 'subtitle', 'short_desc', 'long_desc'],  # Fields to include
            },
            'aboutUsPage': {
                'model': BlogPost,
                'filter': {'category': 'about_us'},
                'fields': ['title', 'subtitle', 'short_desc', 'long_desc'],
            },
            'blogpostSection': {
                'model': BlogPost,
                'filter': {},  # All blog posts
                'fields': ['title', 'subtitle', 'short_desc', 'long_desc'],
            },
            'doctorContent': {
                'model': TeamMember,
                'filter': {},  # All team members
                'fields': ['name', 'role', 'group', 'description'],
            },
            # Add more mappings for other modules (e.g., 'csrContent': {'model': CSR, ...})
            # If a module doesn't map to a model, you can hardcode or skip it
        }

        for module_name, config in mappings.items():
            model = config['model']
            filter_kwargs = config.get('filter', {})
            fields = config['fields']
            
            # Query instances (limit to featured or recent if needed)
            instances = model.objects.filter(**filter_kwargs)[:10]  # Example: Limit to 10 for performance
            
            # Build dictionary structure
            dictionary = {}
            for locale in locales:
                dictionary[locale] = {}
                for instance in instances:
                    instance_key = f"{instance.__class__.__name__.lower()}_{instance.id}"  # e.g., "blogpost_uuid"
                    dictionary[locale][instance_key] = {}
                    for field in fields:
                        translated_field = f"{field}_{locale}" if locale != 'en' else field
                        value = getattr(instance, translated_field, getattr(instance, field, ''))  # Fallback to base field
                        dictionary[locale][instance_key][field] = value
            
            # Write to JSON file
            file_path = os.path.join(frontend_dict_path, f'{module_name}.json')
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(dictionary, f, ensure_ascii=False, indent=2)
            
            self.stdout.write(f'Generated {file_path}')

        self.stdout.write('All dictionaries generated successfully.')