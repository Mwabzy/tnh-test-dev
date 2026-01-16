import uuid
from django.db import models
from django.utils import timezone  # for automatic date

class TeamMember(models.Model):
    id = models.CharField(primary_key=True, max_length=100, editable=False, default=uuid.uuid4)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    group = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to="team_members/", blank=True, null=True)
    image_alt = models.CharField(max_length=255, blank=True, default="")
    description = models.TextField()

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    isFeatured = models.BooleanField(default=False)
    author = models.CharField(max_length=100)

    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    blogsubtitle = models.CharField(max_length=255, blank=True)  

    shortdesc = models.TextField()
    longdesc = models.TextField()

    category = models.CharField(max_length=100)
    date = models.DateField(auto_now_add=True) 

    coverImage = models.URLField(max_length=500, blank=True) 
    image = models.URLField(max_length=500)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class CSR(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.CharField(max_length=225)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    blogsubtitle = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    shortdesc = models.TextField()
    longdesc = models.TextField()
    coverImage = models.URLField(max_length=500, blank=True)
    
    image = models.JSONField(default=list)  # Storing list of image URLs
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title