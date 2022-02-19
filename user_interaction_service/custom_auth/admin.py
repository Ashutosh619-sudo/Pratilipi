from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
User = get_user_model()

class UserAdmin(BaseUserAdmin):

    list_display = ('email','id')
    list_filter= ()
    fieldsets = (
        (None,({'fields': ('email', 'password')})),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email',)}
        ),
    )

    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()

admin.site.register(User,UserAdmin)
admin.site.unregister(Group)
