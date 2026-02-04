import uuid
from django.db import models


class TeamMember(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    group = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to="team_members/", blank=True, null=True)
    image_alt = models.CharField(max_length=255, blank=True)
    description = models.TextField()

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    is_featured = models.BooleanField(default=False)
    author = models.CharField(max_length=100)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    blog_subtitle = models.CharField(max_length=255, blank=True)
    short_desc = models.TextField()
    long_desc = models.TextField()
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
    subtitle = models.CharField(max_length=255)
    blog_subtitle = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    short_desc = models.TextField()
    long_desc = models.TextField()
    cover_image = models.ImageField(upload_to="csr/covers/", blank=True, null=True)
    cover_image_alt = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
    