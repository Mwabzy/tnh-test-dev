from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import ClinicalService, Doctor, Contact, Testimonial
from .serializers import ClinicalServiceSerializer, DoctorSerializer, ContactSerializer, TestimonialSerializer

class ClinicalServiceViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = ClinicalService.objects.all()
    serializer_class = ClinicalServiceSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
