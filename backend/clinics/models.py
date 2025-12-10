from django.db import models

class Doctor(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)      
    bio = models.TextField(blank=True, null=True)
    image = models.URLField(blank=True, null=True)

    services_offered = models.ManyToManyField(
        'ClinicalService',
        blank=True,
        related_name='offered_by_doctors'
    )
    research_publications = models.TextField(blank=True, null=True)
    awards = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.name


class Testimonial(models.Model):
    name = models.CharField(max_length=100) 
    quote = models.TextField()
    title = models.CharField(max_length=100, blank=True, null=True)
    image = models.URLField(blank=True, null=True) 
    rating = models.PositiveIntegerField(default=5)

    def __str__(self):
        return f"{self.name} ({self.rating}/5)"

class ClinicalService(models.Model):
    title = models.CharField(max_length=100)
    tagline = models.CharField(max_length=255)
    overview = models.TextField()
    detailedDescription = models.TextField(blank=True, null=True)
    features = models.JSONField(default=list)
    doctors = models.ManyToManyField(Doctor, blank=True)
    testimonials = models.ManyToManyField(Testimonial, blank=True)
    contact = models.JSONField(blank=True, null=True)
    isBookable = models.BooleanField(default=False)
    hasReadMore = models.BooleanField(default=False)
    clinics = models.ManyToManyField("self", symmetrical=False, blank=True, related_name="parent_services")
    images = models.JSONField(blank=True, null=True)  
    locations = models.JSONField(blank=True, default=list)  

    def __str__(self):
        return self.title
