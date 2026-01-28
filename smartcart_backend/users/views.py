from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from orders.models import Order
from orders.serializers import OrderSerializer

User = get_user_model()

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user

    if request.method == 'GET':
        orders = Order.objects.filter(user=user).order_by('-created_at')
        order_serializer = OrderSerializer(orders, many=True)
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'shipping_address': getattr(user, 'shipping_address', ''),
            'orders': order_serializer.data
        })

    elif request.method == 'PUT':
        data = request.data
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.email = data.get('email', user.email)
        if 'password' in data and data['password']:
            user.set_password(data['password'])
        if 'shipping_address' in data:
            user.shipping_address = data['shipping_address']
        user.save()
        return Response({'message': 'Profile updated successfully'})

