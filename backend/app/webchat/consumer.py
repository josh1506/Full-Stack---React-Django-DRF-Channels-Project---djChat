from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer


# https://channels.readthedocs.io/en/latest/topics/consumers.html#websocketconsumer
class WebChatConsumer(JsonWebsocketConsumer):
    # groups = ["broadcast"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_name = 'testserver'

    def connect(self):
        # Called on connection.
        # To accept the connection call:
        self.accept()
        async_to_sync(self.channel_layer.group_add)(self.room_name, self.channel_name)
        # Or accept the connection and specify a chosen subprotocol.
        # A list of subprotocols specified by the connecting client
        # will be available in self.scope['subprotocols']
        # self.accept("subprotocol")
        # To reject the connection, call:
        # self.close()

    def receive_json(self, content):
        # Called with either text_data or bytes_data for each frame
        # You can call:
        async_to_sync(self.channel_layer.group_send)(
            self.room_name,
            {"type": "chat.message", "new_message": content["message"]}
        )
        # Want to force-close the connection? Call:
        # self.close()

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        # Called when the socket closes
        pass
