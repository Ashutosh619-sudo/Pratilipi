from .producer import publish
from .models import User

from .serializer import UserSerializer, UserSerializer, ValidateUserSerializer
from rest_framework.permissions import AllowAny

from rest_framework import generics

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.hashers import make_password

import csv
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage


class RegisterView(generics.CreateAPIView):

    """Post Request to register user. Email and password must be provided in the request, 
    if not 404 bad request will be send as response with appropriate error"""

    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

class ValidateUser(APIView):
    """
    Post request to validate the user if user with the given user_id exists,
    if validated an event named content_liked is published in the queue with the data.
    if not validated the serializer throws validation error which sends 404 bad request to the client.

    """

    def post(self,request,id):
        
        serializer = ValidateUserSerializer(data=request.data)
        if(serializer.is_valid(raise_exception=True)):
            if(User.objects.filter(id=id).exists()):
                publish('content_liked',serializer.data)
                return Response(serializer.data)
            else:
                return Response({"detail":"User doesn't exists"},status=status.HTTP_400_BAD_REQUEST)

class UploadUser(APIView):
    """
    Post request to upload Custom User data. The data must be a csv file, 
    it must only contain two column email, password.
    Both email and password must be as per email and password validation done in the service
    """

    def post(self,request):

        fs = FileSystemStorage(location='tmp/')

        file = request.FILES['file']
        content = file.read()
        
        file_content = ContentFile(content)
        file_name = fs.save("tmp.csv",file_content)

        tmp_file = fs.path(file_name)

        csv_file = open(tmp_file,errors="ignore")
        reader = csv.reader(csv_file)
        next(reader)

        user_list = []

        for id,row in enumerate(reader):
            (
                email,
                password
            )  = row

            user_list.append(User(email=email,password=make_password(password)))

        User.objects.bulk_create(user_list)

        return Response("Succesfully Updated User")
