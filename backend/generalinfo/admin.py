from django.contrib import admin
from .models import TeamMember, BlogPost

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'role', 'group')
    search_fields = ('name', 'title', 'description')
    ordering = ('name',)
    readonly_fields = () 

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'is_featured', 'created_at')
    search_fields = ('title', 'author')
    ordering = ('-created_at',)
    readonly_fields = () 