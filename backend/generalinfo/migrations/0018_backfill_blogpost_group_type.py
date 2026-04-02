from django.db import migrations


def backfill_group_and_type(apps, schema_editor):
    BlogPost = apps.get_model("generalinfo", "BlogPost")

    updated = 0
    for post in BlogPost.objects.all():
        group = (post.group or "").strip()
        typ = (post.type or "").strip()

        # If group is missing, try to infer it from type
        if not group:
            if typ.lower() == "news":
                group = "NEWS"
            elif typ.lower() == "article":
                group = "ARTICLES"

        # If type is missing, try to infer it from group
        if not typ:
            if group.upper() == "NEWS":
                typ = "news"
            elif group.upper() == "ARTICLES":
                typ = "article"

        # Default fallback: if both missing, treat as NEWS
        if not group and not typ:
            group = "NEWS"
            typ = "news"

        if group != post.group or typ != post.type:
            post.group = group
            post.type = typ
            post.save(update_fields=["group", "type"])
            updated += 1

    print(f"Backfilled group/type on {updated} blog posts.")


def noop_reverse(apps, schema_editor):
    # No-op reverse; we don't want to blank out data.
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("generalinfo", "0017_blogpost_group_type"),
    ]

    operations = [
        migrations.RunPython(backfill_group_and_type, noop_reverse),
    ]
