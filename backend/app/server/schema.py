from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes

from .serializers import ChannelSerializer, ServerSerializer

server_list_docs = extend_schema(
    responses=ServerSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name='category',
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Category of the server to retrieve.",
        ),
        OpenApiParameter(
            name='qty',
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            description="Quantity of the server to retrieve.",
        ),
        OpenApiParameter(
            name='by_user',
            type=OpenApiTypes.BOOL,
            location=OpenApiParameter.QUERY,
            description="By user of the server to retrieve.",
        ),
        OpenApiParameter(
            name='by_server_id',
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            description="By server ID of the server to retrieve.",
        ),
        OpenApiParameter(
            name='with_num_members',
            type=OpenApiTypes.BOOL,
            location=OpenApiParameter.QUERY,
            description="With members count of the server to retrieve.",
        ),
    ]
)
