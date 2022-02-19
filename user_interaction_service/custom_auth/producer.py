import pika, json

params = pika.URLParameters('amqps://zgowpnbs:HSLfkbWBVuz9warmYt52l7jDWJ4vL5Yk@puffin.rmq2.cloudamqp.com/zgowpnbs')

connection = pika.BlockingConnection(params)

channel = connection.channel()

def publish(method,body):
    print("published")
    properties = pika.BasicProperties(method)
    channel.basic_publish(exchange="",routing_key="main",body=json.dumps(body),properties=properties)
