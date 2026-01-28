from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Order, OrderItem
from cart.models import Cart, CartItem
from products.models import Product
from .serializers import OrderSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    shipping_address = request.data.get('shipping_address', '')

    # Get user's cart
    cart, _ = Cart.objects.get_or_create(user=user)
    if cart.items.count() == 0:
        return Response({'error': 'Cart is empty'}, status=400)

    # Calculate total price
    total_price = sum([item.product.price * item.quantity for item in cart.items.all()])

    # Create order
    order = Order.objects.create(user=user, shipping_address=shipping_address, total_price=total_price)

    # Create order items
    for item in cart.items.all():
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price * item.quantity
        )

    # Clear cart
    cart.items.all().delete()

    return Response({'status': 'Order placed', 'order_id': order.id})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_detail(request, order_id):
    try:
        order = Order.objects.get(id=order_id, user=request.user)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=404)

    serializer = OrderSerializer(order)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):
    cart = Cart.objects.get(user=request.user)

    if cart.items.count() == 0:
        return Response({"error": "Cart is empty"}, status=400)

    order = Order.objects.create(
        user=request.user,
        shipping_address=request.data.get('shipping_address', '')
    )

    for item in cart.items.all():
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price * item.quantity
        )

    order.calculate_total()   # ⭐ VERY IMPORTANT

    cart.items.all().delete()  # clear cart

    return Response({
        "message": "Order created",
        "order_id": order.id,
        "total_price": order.total_price
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def payment_success(request, order_id):
    order = Order.objects.get(id=order_id, user=request.user)

    order.is_paid = True
    order.status = 'Completed'
    order.save()

    return Response({"message": "Payment successful"})

