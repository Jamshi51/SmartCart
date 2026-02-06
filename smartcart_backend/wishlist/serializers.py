# serializers.py
from rest_framework import serializers
from .models import Wishlist

class WishlistSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    product_price = serializers.FloatField(source="product.price", read_only=True)
    product_image = serializers.ImageField(source="product.image", read_only=True)
    product_slug = serializers.CharField(source="product.slug", read_only=True)  # ✅ important

    class Meta:
        model = Wishlist
        fields = ["id", "product", "product_name", "product_price", "product_image", "product_slug"]
