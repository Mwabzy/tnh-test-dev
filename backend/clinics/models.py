from django.db import models



# Doctor Model

class Doctor(models.Model):
    name = models.CharField(max_length=100)

    role = models.CharField(max_length=100)
    role_fr = models.CharField(max_length=100, blank=True, null=True)
    role_es = models.CharField(max_length=100, blank=True, null=True)
    role_zh = models.CharField(max_length=100, blank=True, null=True)
    role_ru = models.CharField(max_length=100, blank=True, null=True)

    bio = models.TextField(blank=True, null=True)
    bio_fr = models.TextField(blank=True, null=True)
    bio_es = models.TextField(blank=True, null=True)
    bio_zh = models.TextField(blank=True, null=True)
    bio_ru = models.TextField(blank=True, null=True)

    services_offered = models.ManyToManyField(
        'ClinicalService',
        blank=True,
        related_name='offered_by_doctors'
    )

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
    tagline_fr = models.CharField(max_length=255, blank=True, null=True)
    tagline_es = models.CharField(max_length=255, blank=True, null=True)
    tagline_zh = models.CharField(max_length=255, blank=True, null=True)
    tagline_ru = models.CharField(max_length=255, blank=True, null=True)

    overview = models.TextField()
    overview_fr = models.TextField(blank=True, null=True)
    overview_es = models.TextField(blank=True, null=True)
    overview_zh = models.TextField(blank=True, null=True)
    overview_ru = models.TextField(blank=True, null=True)

    detailedDescription = models.TextField(blank=True, null=True)
    detailedDescription_fr = models.TextField(blank=True, null=True)
    detailedDescription_es = models.TextField(blank=True, null=True)
    detailedDescription_zh = models.TextField(blank=True, null=True)
    detailedDescription_ru = models.TextField(blank=True, null=True)

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
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True)

    description = models.TextField()
    description_fr = models.TextField(blank=True, null=True)
    description_es = models.TextField(blank=True, null=True)
    description_zh = models.TextField(blank=True, null=True)
    description_ru = models.TextField(blank=True, null=True)

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
    
class ClinicalFAQ(models.Model):
    brief = models.CharField(max_length=255, blank=True, null=True)

    question = models.TextField()
    answer = models.TextField()

    question_fr = models.TextField(blank=True, null=True)
    question_es = models.TextField(blank=True, null=True)
    question_zh = models.TextField(blank=True, null=True)
    question_ru = models.TextField(blank=True, null=True)

    answer_fr = models.TextField(blank=True, null=True)
    answer_es = models.TextField(blank=True, null=True)
    answer_zh = models.TextField(blank=True, null=True)
    answer_ru = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.brief

    