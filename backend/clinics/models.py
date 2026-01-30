from django.db import models



# Doctor Model

class Doctor(models.Model):
    # Basic Info
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    bio = models.TextField(blank=True, null=True)
    image = models.CharField(max_length=500, null=True, blank=True,  default="")


    # Relationships
    services_offered = models.ManyToManyField(
        'ClinicalService',
        blank=True,
        related_name='offered_by_doctors'
    )

    # Additional Info
    research_publications = models.JSONField(default=list, blank=True)
    awards = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.name




# Testimonial Model

class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    quote = models.TextField()
    title = models.CharField(max_length=100, blank=True, null=True)
    image = models.URLField(blank=True, null=True)
    rating = models.PositiveIntegerField(default=5)

    def __str__(self):
        return f"{self.name} ({self.rating}/5)"



# Clinical Service image model
class ClinicalServiceImage(models.Model):
    clinical_service = models.ForeignKey(
        "ClinicalService",
        related_name="uploaded_images",
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="clinical_services/")
    alt = models.CharField(max_length=255, blank=True, default="")

    def __str__(self):
        return f"Image for {self.clinical_service.title}"
    

# Doctor Image model
class DoctorImage(models.Model):
    doctor = models.ForeignKey(
        Doctor,
        related_name="uploaded_images",
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="doctors/")
    alt = models.CharField(max_length=255, blank=True, default="")

    def __str__(self):
        return f"Image for {self.doctor.name}"




# Clinical Service Model 
class ClinicalService(models.Model):
    # Basic Info
    title = models.CharField(max_length=100)
    tagline = models.CharField(max_length=255)
    overview = models.TextField()
    detailedDescription = models.TextField(blank=True, null=True)

    # Relationships
    doctors = models.ManyToManyField(
        Doctor,
        blank=True,
        related_name='services'
    )
    testimonials = models.ManyToManyField(Testimonial, blank=True)

    # More Info
    features = models.JSONField(default=list)
    # images = models.JSONField(blank=True, null=True)
    locations = models.JSONField(blank=True, default=list)
    contact = models.JSONField(blank=True, null=True)

    # Checkboxes
    isBookable = models.BooleanField(default=False)
    hasReadMore = models.BooleanField(default=False)

    # Sub clinics
    clinics = models.ManyToManyField(
        "self",
        symmetrical=False,
        blank=True,
        related_name="parent_services"
    )

    def __str__(self):
        return self.title
    

class ClinicalServiceFeatureImage(models.Model):
    clinical_service = models.ForeignKey(
        ClinicalService,
        related_name="feature_images",
        on_delete=models.CASCADE
    )
    feature_index = models.PositiveIntegerField()
    image = models.ImageField(upload_to="clinical_services/features/")
    alt = models.CharField(max_length=255, blank=True, default="")

    def __str__(self):
        return f"Feature image {self.feature_index} for {self.clinical_service.title}"

  
class OutpatientCenter(models.Model):
    # Basic Info
    name = models.CharField(max_length=150)
    slug = models.SlugField(
        max_length=200,
        unique=True,
        blank=True,
        null=True
    )
    description = models.TextField()

    # Location & Contact
    location = models.CharField(max_length=255)
    contact = models.JSONField(blank=True, null=True)

    # Relationships
    services_offered = models.ManyToManyField(
        'ClinicalService',
        blank=True,
        related_name='outpatient_centers'
    )

    # Timings
    timings = models.JSONField(default=list,blank=True)

    def __str__(self):
        return self.name
    