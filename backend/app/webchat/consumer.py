from django.contrib.auth import get_user_model

from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from app.webchat.models import Conversation, Message

User = get_user_model()


# https://channels.readthedocs.io/en/latest/topics/consumers.html#websocketconsumer
class WebChatConsumer(JsonWebsocketConsumer):
    # groups = ["broadcast"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.channel_id = None
        self.user = None

    def connect(self):
        # Called on connection.
        # To accept the connection call:
        self.accept()
        self.channel_id = self.scope['url_route']['kwargs']['channel_id']
        self.user = User.objects.get(id=1)

        async_to_sync(self.channel_layer.group_add)(self.channel_id, self.channel_name)
        # Or accept the connection and specify a chosen subprotocol.
        # A list of subprotocols specified by the connecting client
        # will be available in self.scope['subprotocols']
        # self.accept("subprotocol")
        # To reject the connection, call:
        # self.close()

    def receive_json(self, content):
        channel_id = self.channel_id
        sender = self.user
        message = content['message']

        conversation, _ = Conversation.objects.get_or_create(channel_id=channel_id)
        new_message = Message.objects.create(conversation=conversation, content=message, sender=sender)

        # Called with either text_data or bytes_data for each frame
        # You can call:
        async_to_sync(self.channel_layer.group_send)(
            self.channel_id,
            {"type": "chat.message", "new_message": {
                "id": new_message.id,
                "content": new_message.content,
                "sender": new_message.sender.username,
                "timestamp": new_message.timestamp.isoformat(),
            }}
        )

        # Want to force-close the connection? Call:
        # self.close()

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        # Called when the socket closes
        async_to_sync(self.channel_layer.group_discard)(self.channel_id, self.channel_name)
        super().disconnect(close_code)
