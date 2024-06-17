from channels.generic.websocket import WebsocketConsumer


# https://channels.readthedocs.io/en/latest/topics/consumers.html#websocketconsumer
class MyConsumer(WebsocketConsumer):
    # groups = ["broadcast"]

    def connect(self):
        # Called on connection.
        # To accept the connection call:
        self.accept()
        # Or accept the connection and specify a chosen subprotocol.
        # A list of subprotocols specified by the connecting client
        # will be available in self.scope['subprotocols']
        # self.accept("subprotocol")
        # To reject the connection, call:
        # self.close()

    def receive(self, text_data=None, bytes_data=None):
        # Called with either text_data or bytes_data for each frame
        # You can call:
        print(text_data)
        self.send(text_data=f"This is a reply from the server")
        # Want to force-close the connection? Call:
        # self.close()

    def disconnect(self, close_code):
        # Called when the socket closes
        pass
