from django.db.models import Count
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
        by_user = request.query_params.get('by_user', 'false').lower() == "true"
        by_server_id = request.query_params.get('by_server_id')
        with_num_members = request.query_params.get('with_num_members', 'false').lower() == "true"

        if by_user is True and not request.user.is_authenticated:
            raise AuthenticationFailed()

        if category is not None:
            self.queryset = self.queryset.filter(category__name=category)

        if qty is True:
            self.queryset = self.queryset[: int(qty)]

        if with_num_members is True:
            self.queryset = self.queryset.annotate(num_members=Count('members'))

        if by_server_id is not None:
            self.queryset = [get_object_or_404(Server, pk=by_server_id)]

        if by_user is True:
            user_id = request.user.id
            self.queryset = self.queryset.filter(member=user_id)

        serializer = ServerSerializer(self.queryset, many=True, context={"num_members": with_num_members})
        return Response(serializer.data)

