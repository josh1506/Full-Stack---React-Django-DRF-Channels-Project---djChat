from rest_framework import serializers

from app.server.models import Server, Channel


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = '__all__'


class ServerSerializer(serializers.ModelSerializer):
    channel_server = ChannelSerializer(many=True, read_only=True)
    num_members = serializers.SerializerMethodField()

    class Meta:
        model = Server
        exclude = ('member', )

    def get_num_members(self, obj):
        if hasattr(obj, "num_members"):
            return obj.num_members
        # return obj.member.count()
        return None

    def to_representation(self, instance):
        data = super().to_representation(instance)
        num_members = self.context.get('num_members')  # Reference to views,py context={"num_members": with_num_members}
        if not num_members:
            data.pop('num_members', None)
        return data
