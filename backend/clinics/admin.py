from django.contrib import admin
from clinics.models import ClinicalService, Doctor, Testimonial


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'role', 'image') 
    search_fields = ('name', 'title')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'title')
    search_fields = ('name',)

@admin.register(ClinicalService)
class ClinicalServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'tagline', 'isBookable', 'hasReadMore')
    search_fields = ('title', 'tagline')
    filter_horizontal = ('doctors', 'testimonials', 'clinics')
