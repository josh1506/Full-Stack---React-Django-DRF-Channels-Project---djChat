from rest_framework import viewsets
from rest_framework.response import Response

from .models import Conversation, Message
from .serializers import MessageSerializer
from .schemas import list_message_docs


class MessageViewSet(viewsets.ViewSet):
    @list_message_docs
    def list(self, request):
        channel_id = request.query_params.get('channel_id')

        try:
            conversation = Conversation.objects.get(channel_id=channel_id)
            messages = Message.objects.filter(conversation=conversation)
            serializer = MessageSerializer(messages, many=True)
            return Response(serializer.data)
        except Conversation.DoesNotExist:
            return Response([])
