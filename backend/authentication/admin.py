from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from authentication.models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'username', 'is_staff', 'is_active',)
    list_filter = ('is_staff', 'is_active',)
    search_fields = ('email', 'username')
    ordering = ('email',)

    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
