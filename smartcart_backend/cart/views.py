from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from products.models import Product
from rest_framework import status

# GET: fetch user cart
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

# POST: add product to cart
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    user = request.user
    product_id = request.data.get('product')
    quantity = request.data.get('quantity', 1)

    cart, _ = Cart.objects.get_or_create(user=user)
    product = Product.objects.get(id=product_id)

    item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product
    )

    if not created:
        item.quantity += int(quantity)
    else:
        item.quantity = int(quantity)

    item.save()

    return Response(
        {
            "success": True,
            "message": "Product added to cart successfully"
        },
        status=status.HTTP_200_OK
    )
# POST: remove product from cart
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    product_id = request.data.get('product')

    try:
        item = CartItem.objects.get(cart=cart, product_id=product_id)
        item.delete()
        return Response({'status': 'Product removed from cart'})
    except CartItem.DoesNotExist:
        return Response({'status': 'Item not found in cart'}, status=404)

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
