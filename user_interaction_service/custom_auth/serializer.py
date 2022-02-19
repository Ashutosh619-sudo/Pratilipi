from django.forms import ValidationError
from rest_framework import serializers
from .models import User
import django.contrib.auth.password_validation as validators


class UserSerializer(serializers.ModelSerializer):
    """ Serailizer for user returns only id in the response"""

    class Meta:
        model = User
        fields = ('id','email','password')
        extra_kwargs = {'password': {'write_only': True},'email':{'write_only': True}}

    
    def validate_password(self, value):
        """validate password with custom made validators"""
        try:
            validators.validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(e)
        return value
    
    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])

        user.is_active = True
        user.save()
        return user
    
class ValidateUserSerializer(serializers.Serializer):
    """ Validates if the client has sent user_id and content_id in the request, if not raises validation error"""
    content_id = serializers.CharField()
    user_id = serializers.CharField()

    def validate(self, attrs):
        content_id = attrs["content_id"]
        user_id = attrs["user_id"]

        if not content_id and not user_id:
            raise serializers.ValidationError("content_id must be provided")
        
        return attrs
