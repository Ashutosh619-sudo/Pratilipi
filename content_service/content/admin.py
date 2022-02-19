from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Content

# Register your models here.

admin.site.register(Content)
admin.site.unregister(Group)
