import uuid
from django.db import models
from django.utils import timezone


class TeamMember(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=255)

    role = models.CharField(max_length=255)
    role_fr = models.CharField(max_length=255, blank=True)
    role_es = models.CharField(max_length=255, blank=True)
    role_zh = models.CharField(max_length=255, blank=True)
    role_ru = models.CharField(max_length=255, blank=True)

    group = models.CharField(max_length=255, blank=True)
    group_fr = models.CharField(max_length=255, blank=True)
    group_es = models.CharField(max_length=255, blank=True)
    group_zh = models.CharField(max_length=255, blank=True)
    group_ru = models.CharField(max_length=255, blank=True)

    image = models.ImageField(upload_to="team_members/", blank=True, null=True)
    image_alt = models.CharField(max_length=255, blank=True)

    description = models.TextField()
    description_fr = models.TextField(blank=True)
    description_es = models.TextField(blank=True)
    description_zh = models.TextField(blank=True)
    description_ru = models.TextField(blank=True)

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    is_featured = models.BooleanField(default=False)

    author = models.CharField(max_length=100)

    title = models.CharField(max_length=255)
    title_fr = models.CharField(max_length=255, blank=True)
    title_es = models.CharField(max_length=255, blank=True)
    title_zh = models.CharField(max_length=255, blank=True)
    title_ru = models.CharField(max_length=255, blank=True)

    subtitle = models.CharField(max_length=255)
    subtitle_fr = models.CharField(max_length=255, blank=True)
    subtitle_es = models.CharField(max_length=255, blank=True)
    subtitle_zh = models.CharField(max_length=255, blank=True)
    subtitle_ru = models.CharField(max_length=255, blank=True)

    blog_subtitle = models.CharField(max_length=255, blank=True)
    blog_subtitle_fr = models.CharField(max_length=255, blank=True)
    blog_subtitle_es = models.CharField(max_length=255, blank=True)
    blog_subtitle_zh = models.CharField(max_length=255, blank=True)
    blog_subtitle_ru = models.CharField(max_length=255, blank=True)

    short_desc = models.TextField()
    short_desc_fr = models.TextField(blank=True)
    short_desc_es = models.TextField(blank=True)
    short_desc_zh = models.TextField(blank=True)
    short_desc_ru = models.TextField(blank=True)

    long_desc = models.TextField()
    long_desc_fr = models.TextField(blank=True)
    long_desc_es = models.TextField(blank=True)
    long_desc_zh = models.TextField(blank=True)
    long_desc_ru = models.TextField(blank=True)

    category = models.CharField(max_length=100)

    date = models.DateField(auto_now_add=True)

    cover_image = models.ImageField(upload_to="blog/covers/", blank=True, null=True)
    cover_image_alt = models.CharField(max_length=255, blank=True)

    image = models.ImageField(upload_to="blog/images/", blank=True, null=True)
    image_alt = models.CharField(max_length=255, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title



class CSR(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    author = models.CharField(max_length=225)

    title = models.CharField(max_length=255)
    title_fr = models.CharField(max_length=255, blank=True)
    title_es = models.CharField(max_length=255, blank=True)
    title_zh = models.CharField(max_length=255, blank=True)
    title_ru = models.CharField(max_length=255, blank=True)

    subtitle = models.CharField(max_length=255)
    subtitle_fr = models.CharField(max_length=255, blank=True)
    subtitle_es = models.CharField(max_length=255, blank=True)
    subtitle_zh = models.CharField(max_length=255, blank=True)
    subtitle_ru = models.CharField(max_length=255, blank=True)

    blog_subtitle = models.CharField(max_length=255, blank=True)
    blog_subtitle_fr = models.CharField(max_length=255, blank=True)
    blog_subtitle_es = models.CharField(max_length=255, blank=True)
    blog_subtitle_zh = models.CharField(max_length=255, blank=True)
    blog_subtitle_ru = models.CharField(max_length=255, blank=True)

    description = models.TextField(blank=True)
    description_fr = models.TextField(blank=True)
    description_es = models.TextField(blank=True)
    description_zh = models.TextField(blank=True)
    description_ru = models.TextField(blank=True)

    short_desc = models.TextField()
    short_desc_fr = models.TextField(blank=True)
    short_desc_es = models.TextField(blank=True)
    short_desc_zh = models.TextField(blank=True)
    short_desc_ru = models.TextField(blank=True)

    long_desc = models.TextField()
    long_desc_fr = models.TextField(blank=True)
    long_desc_es = models.TextField(blank=True)
    long_desc_zh = models.TextField(blank=True)
    long_desc_ru = models.TextField(blank=True)

    cover_image = models.ImageField(upload_to="csr/covers/", blank=True, null=True)
    cover_image_alt = models.CharField(max_length=255, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Tender(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    opportunity = models.CharField(max_length=255)
    reference_number = models.CharField(max_length=100)
    description = models.TextField()
    opportunity_type = models.CharField(max_length=50, default="Tender")
    date_posted = models.DateField()
    closing_date = models.DateField()

    file = models.FileField(upload_to="tenders/", blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.opportunity
    
    

class Career(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    title = models.CharField(max_length=255)
    title_fr = models.CharField(max_length=255, blank=True)
    title_es = models.CharField(max_length=255, blank=True)
    title_zh = models.CharField(max_length=255, blank=True)
    title_ru = models.CharField(max_length=255, blank=True)

    location = models.CharField(max_length=255)
    location_fr = models.CharField(max_length=255, blank=True)
    location_es = models.CharField(max_length=255, blank=True)
    location_zh = models.CharField(max_length=255, blank=True)
    location_ru = models.CharField(max_length=255, blank=True)

    description = models.TextField()
    description_fr = models.TextField(blank=True)
    description_es = models.TextField(blank=True)
    description_zh = models.TextField(blank=True)
    description_ru = models.TextField(blank=True)

    requirements = models.TextField()
    requirements_fr = models.TextField(blank=True)
    requirements_es = models.TextField(blank=True)
    requirements_zh = models.TextField(blank=True)
    requirements_ru = models.TextField(blank=True)

    opportunity_type = models.CharField(max_length=50, blank=True, default="")
    closing_date = models.DateField(blank=True, null=True)
    file = models.FileField(upload_to="careers/", blank=True, null=True)

    posted_date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.title
