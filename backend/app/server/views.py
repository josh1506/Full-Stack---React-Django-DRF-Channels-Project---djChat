from django.db.models import Count
from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response

from app.server.models import Server, Category
from .serializers import ServerSerializer
from .schema import server_list_docs


class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()

    @server_list_docs
    def list(self, request):
        """
        List the servers based on various filtering criteria passed via query parameters.

        This method retrieves servers based on the specified filtering criteria such as category, quantity,
        server ID, and whether the server list should include the number of members or be specific to the authenticated user.

        Args:
            request (Request): The request object containing query parameters. Supported parameters include:
                - category (str): Filter the servers by category name.
                - qty (int): Limit the number of servers returned.
                - by_user (bool): If true, filter the servers where the authenticated user is a member. Defaults to false.
                - by_server_id (int): Get a specific server by its ID.
                - with_num_members (bool): If true, include the number of members in each server. Defaults to false.

        Raises:
            AuthenticationFailed: If the by_user is True and the user is not authenticated.

        Returns:
            Response: A response object containing serialized server data. The serialization includes the number of members if requested.

        """
        # Extract query parameters from the request
        category = request.query_params.get('category')
        qty = request.query_params.get('qty')
        by_user = request.query_params.get('by_user', 'false').lower() == "true"
        by_server_id = request.query_params.get('by_server_id')
        with_num_members = request.query_params.get('with_num_members', 'false').lower() == "true"

        # Check if the user filter is applied and the user is not authenticated
        if by_user is True and not request.user.is_authenticated:
            raise AuthenticationFailed()  # Raise an exception if the user is not authenticated

        # Filter queryset based on category if it is specified
        if category is not None:
            self.queryset = self.queryset.filter(category__name=category)

        # Limit the queryset to the specified quantity if qty is given
        if qty is not None:
            self.queryset = self.queryset[:int(qty)]

        # Annotate queryset with the number of members if requested
        if with_num_members is True:
            self.queryset = self.queryset.annotate(num_members=Count('member'))

        # Replace queryset with a single server object if by_server_id is specified
        if by_server_id is not None:
            self.queryset = [get_object_or_404(Server, pk=by_server_id)]

        # Filter the queryset by the current user's ID if the by_user flag is True
        if by_user is True:
            user_id = request.user.id
            self.queryset = self.queryset.filter(member=user_id)

        # Serialize the queryset
        serializer = ServerSerializer(self.queryset, many=True, context={"num_members": with_num_members})
        return Response(serializer.data)  # Return the serialized data as a response
