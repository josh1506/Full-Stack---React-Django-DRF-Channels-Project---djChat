from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response

from app.server.models import Server, Category
from .serializers import ServerSerializer


class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()

    def list(self, request):
        category = request.query_params.get('category')
        qty = request.query_params.get('qty')
        by_user = request.query_params.get('by_user') == "true"
        by_server_id = request.query_params.get('by_server_id')

        if by_user is True and not request.user.is_authenticated:
            raise AuthenticationFailed()

        if category:
            self.queryset = self.queryset.filter(category__name=category)

        if qty is True:
            self.queryset = self.queryset[: int(qty)]

        if by_server_id is not None:
            self.queryset = [get_object_or_404(Server, pk=by_server_id)]

        if by_user is True:
            user_id = request.user.id
            self.queryset = self.queryset.filter(member=user_id)

        serializer = ServerSerializer(self.queryset, many=True)
        return Response(serializer.data)

