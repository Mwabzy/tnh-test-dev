from django.contrib import admin
from clinics.models import (
    ClinicalService,
    Contact,
    Doctor,
    Testimonial,
    RelatedService
)

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'phone', 'email', 'address')
    search_fields = ('phone', 'email')

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'title')
    search_fields = ('name', 'title')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'rating')
    search_fields = ('author',)

@admin.register(RelatedService)
class RelatedServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    search_fields = ('title',)

@admin.register(ClinicalService)
class ClinicalServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'tagline', 'is_bookable')
    search_fields = ('title', 'tagline')
    filter_horizontal = ('doctors', 'testimonials', 'clinics', 'related_services')
