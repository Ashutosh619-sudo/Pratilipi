import pika,json
import django
from sys import path
from os import environ

path.append('/home/ashutoshsudo/Desktop/Pratilipi Assignment/content_service/core/settings.py') #Your path to settings.py file
environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings') 

django.setup()

from content.models import Content

params = pika.URLParameters('amqps://zgowpnbs:HSLfkbWBVuz9warmYt52l7jDWJ4vL5Yk@puffin.rmq2.cloudamqp.com/zgowpnbs')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue="main")

def callback(ch,method,properties,body):
    print("Receiving in main")
    data = json.loads(body)
    content_id = int(data["content_id"])
    user_id = int(data["user_id"])

    if(properties.content_type == "content_liked"):
        if(Content.objects.filter(id=content_id).exists()):

            content = Content.objects.get(id=content_id)
            if(user_id not in content.liked_by):
                content.liked_by.append(user_id)
                content.likes += 1
                content.save()
                print("content updated")
            else:
                content.liked_by.remove(user_id)
                content.likes -= 1
                content.save()
                print("content updated")

    
channel.basic_consume(queue="main",on_message_callback=callback,auto_ack=True)
print("start consuming...")
channel.start_consuming()
channel.close()
