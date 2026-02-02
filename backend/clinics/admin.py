from django.contrib import admin
from clinics.models import ClinicalService, Doctor, Testimonial


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'role', 'image_count')
    search_fields = ('name', 'role')

    def image_count(self, obj):
        return obj.uploaded_images.count()

    image_count.short_description = "Images"

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'title')
    search_fields = ('name',)

@admin.register(ClinicalService)
class ClinicalServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'tagline', 'isBookable', 'hasReadMore')
    search_fields = ('title', 'tagline')
    filter_horizontal = ('doctors', 'testimonials', 'clinics')
