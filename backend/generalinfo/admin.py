from django.contrib import admin
from .models import TeamMember

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'role', 'group')
    search_fields = ('name', 'title', 'description')
    ordering = ('name',)
    readonly_fields = () 