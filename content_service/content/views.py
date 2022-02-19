from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import viewsets
from .models import Content
from rest_framework.response import Response
from rest_framework.generics import ListAPIView

import csv
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage


from .serializer import ContentSerializer
from rest_framework import status


class TopContent(ListAPIView):
    """ 
    Endpoint to get top contents ordered by number of likes 
    """
    queryset = Content.objects.all().order_by('-likes')
    serializer_class = ContentSerializer

class UploadContent(APIView):
    """
    Endpoint to upload custom content data. The data must be a csv file, 
    it must only contain three column user_id, title, story.
    The data must be provided in file attribute in the request.
    """

    def post(self,request):
        # used to store temporary file in tmp folder
        fs = FileSystemStorage(location='tmp/')

        file = request.FILES["file"]
        content = file.read()

        file_content = ContentFile(content)
        file_name = fs.save("tmp.csv",file_content)

        tmp_file = fs.path(file_name)

        csv_file = open(tmp_file,errors="ignore")
        reader = csv.reader(csv_file)
        next(reader)

        content_list = []
        for id_, row in enumerate(reader):
            (
                user_id,
                title,
                story,
            ) = row
            content_list.append(Content(title=title,story=story,user_id=user_id))
        
        Content.objects.bulk_create(content_list)

        return Response("Succesfully updated data")

            
