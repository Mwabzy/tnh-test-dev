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
    photo = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

class Testimonial(models.Model):
    author = models.CharField(max_length=100)
    quote = models.TextField()
    rating = models.PositiveIntegerField(default=5)

    def __str__(self):
        return f"{self.author} ({self.rating}/5)"

class RelatedService(models.Model):
    title = models.CharField(max_length=100)
    image = models.URLField()
    image_alt = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title

class ClinicalService(models.Model):
    title = models.CharField(max_length=100)
    tagline = models.CharField(max_length=255)
    overview = models.TextField()
    features = models.JSONField(default=list)

    doctors = models.ManyToManyField(Doctor, blank=True)
    testimonials = models.ManyToManyField(Testimonial, blank=True)

    contact = models.OneToOneField(Contact, on_delete=models.SET_NULL, null=True, blank=True)
    is_bookable = models.BooleanField(default=False)

    clinics = models.ManyToManyField("self", symmetrical=False, blank=True, related_name="parent_services")
    related_services = models.ManyToManyField(RelatedService, blank=True)

    image = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.title
