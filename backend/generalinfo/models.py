import uuid
from django.db import models

class TeamMember(models.Model):
    id = models.CharField(primary_key=True, max_length=100, editable=False, default=uuid.uuid4)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    group = models.CharField(max_length=255, blank=True)
    image = models.URLField(max_length=500)
    description = models.TextField()


    def __str__(self):
        return self.name

class BlogPost(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    is_featured = models.BooleanField(default=False)
    author = models.CharField(max_length=100)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    blog_subtitle = models.CharField(max_length=255)
    description = models.TextField()
    short_desc = models.TextField()
    long_desc = models.TextField()
    category = models.CharField(max_length=100)
    date = models.CharField(max_length=50)
    cover_image = models.URLField()
    image = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title