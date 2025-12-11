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
