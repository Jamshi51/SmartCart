from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from products.models import Product
from rest_framework import status
from django.shortcuts import get_object_or_404

# GET: fetch user cart
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    user = request.user
    product_id = request.data.get('product')

    cart, _ = Cart.objects.get_or_create(user=user)
    product = Product.objects.get(id=product_id)

    item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product,
        defaults={'quantity': 1}
    )

    return Response({
        "success": True,
        "created": created,
        "message": "Added to cart" if created else "Already in cart"
    })


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, item_id):
    item = get_object_or_404(
        CartItem,
        id=item_id,
        cart__user=request.user
    )
    item.delete()
    return Response({'message': 'Item removed from cart'}, status=200)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_cart_item(request, item_id):
    try:
        item = CartItem.objects.get(id=item_id, cart__user=request.user)
    except CartItem.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)

    quantity = request.data.get("quantity")

    if quantity and int(quantity) > 0:
        item.quantity = quantity
        item.save()
        return Response({"message": "Quantity updated"})
    
    return Response({"error": "Invalid quantity"}, status=400)
