from rest_framework import serializers
from .models import Order
from products.models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'image', 'price']

class OrderSerializer(serializers.ModelSerializer):
    product = ProductSerializer()  # Nested serializer

    class Meta:
        model = Order
        fields = ['id', 'product', 'total_amount', 'payment_method', 'shipping_address', 'created_at']
