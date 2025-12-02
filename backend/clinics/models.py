from django.db import models

class Contact(models.Model):
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.phone} | {self.email}"

class Doctor(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    bio = models.TextField(blank=True, null=True)
    image = models.URLField(blank=True, null=True)  

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
    contact = models.OneToOneField(Contact, on_delete=models.SET_NULL, null=True, blank=True)
    isBookable = models.BooleanField(default=False)
    hasReadMore = models.BooleanField(default=False)
    clinics = models.ManyToManyField("self", symmetrical=False, blank=True, related_name="parent_services")
    images = models.JSONField(blank=True, null=True)  
    locations = models.JSONField(blank=True, default=list)  

    def __str__(self):
        return self.title
