# from django.contrib import admin
# from .models import TeamMember, BlogPost

# @admin.register(TeamMember)
# class TeamMemberAdmin(admin.ModelAdmin):
#     list_display = ('id', 'name', 'role', 'group')
#     search_fields = ('name', 'role', 'description')
#     ordering = ('name',)

# @admin.register(BlogPost)
# class BlogPostAdmin(admin.ModelAdmin):
#     list_display = ('title', 'author', 'category', 'isFeatured', 'created_at')
#     search_fields = ('title', 'author')
#     ordering = ('-created_at',)
#     list_filter = ('category', 'isFeatured', 'date')