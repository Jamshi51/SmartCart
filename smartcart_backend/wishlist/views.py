from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Wishlist
from .serializers import WishlistSerializer
from products.models import Product
from rest_framework import status
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def toggle_wishlist(request):
    user = request.user

    # ❌ seller cannot wishlist
    if user.role != "customer":
        return Response(
            {"detail": "Only customers allowed"},
            status=status.HTTP_403_FORBIDDEN
        )

    product_id = request.data.get("product")

    obj, created = Wishlist.objects.get_or_create(
        user=user,
        product_id=product_id
    )

    if not created:
        obj.delete()
        return Response({"liked": False})

    return Response({"liked": True})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def wishlist_list(request):
    items = Wishlist.objects.filter(user=request.user)
    serializer = WishlistSerializer(items, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def wishlist_detail(request, product_id):
    try:
        obj = Wishlist.objects.get(user=request.user, product_id=product_id)
        serializer = WishlistSerializer(obj)
        return Response(serializer.data)
    except Wishlist.DoesNotExist:
        return Response({"detail": "Not in wishlist"}, status=404)
