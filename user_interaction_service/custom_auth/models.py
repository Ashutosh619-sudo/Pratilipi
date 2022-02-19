from django.db import models
from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self,email,password,is_staff=False,is_active=True,is_admin=False,**extra_fields):
        if not email:
            raise ValueError("Users must have a email")
        
        user_obj = self.model(email=email,**extra_fields)
        user_obj.set_password(password)


        user_obj.is_staff = is_staff
        user_obj.is_admin = is_admin
        user_obj.is_active = is_active

        user_obj.save(using=self._db)
        return user_obj
    
    def create_superuser(self,email,password=None,**extra_fields):
        user = self.create_user(
            email,
            password=password,
            is_staff=True,
            is_admin=True,
            **extra_fields
            )
        return user

class User(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(max_length=254,unique=True,blank=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    
    objects = UserManager()

    def __str__(self):
        return str(self.email)
    
    @property
    def is_superuser(self):
        return self.is_admin
