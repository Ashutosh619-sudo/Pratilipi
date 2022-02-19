from django.db import models
import datetime
from django.contrib.postgres.fields import ArrayField
# Create your models here.


class Content(models.Model):
    title = models.CharField(max_length=50,blank=False)
    story = models.CharField(max_length=1000,blank=False)
    likes = models.IntegerField(default=0)
    liked_by = ArrayField(models.IntegerField(blank=True), default=[0])
    user_id = models.IntegerField(blank=False)
    date_published = models.DateField(default=datetime.date.today())

    def __str__(self):
        return self.title
    
    
