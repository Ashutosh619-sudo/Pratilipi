from django import views
from django.urls import path
from .views import TopContent, UploadContent

urlpatterns = [
    path('',view=TopContent.as_view()),
    path('upload-content/',view=UploadContent.as_view())
]
