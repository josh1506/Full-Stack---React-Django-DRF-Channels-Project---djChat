from rest_framework import serializers

from app.server.models import Server, Channel


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = '__all__'


class ServerSerializer(serializers.ModelSerializer):
    channel_server = ChannelSerializer(many=True, read_only=True)

    class Meta:
        model = Server
        fields = '__all__'
