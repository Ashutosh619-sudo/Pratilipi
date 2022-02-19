from django.urls import path
from .views import RegisterView, ValidateUser,UploadUser

urlpatterns = [
    path('',RegisterView.as_view()),    
    path('validate-user/<int:id>',ValidateUser.as_view()),
    path('upload-users/',UploadUser.as_view())
]
