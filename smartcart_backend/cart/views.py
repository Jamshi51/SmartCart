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

# POST: update quantity
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cart_item(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    product_id = request.data.get('product')
    quantity = int(request.data.get('quantity', 1))

    try:
        item = CartItem.objects.get(cart=cart, product_id=product_id)
        item.quantity = quantity
        item.save()
        return Response({'status': 'Quantity updated'})
    except CartItem.DoesNotExist:
        return Response({'status': 'Item not found in cart'}, status=404)
