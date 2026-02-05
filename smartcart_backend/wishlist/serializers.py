from rest_framework import serializers
from .models import Wishlist

# serializers.py
class WishlistSerializer(serializers.ModelSerializer):
    product_slug = serializers.CharField(source="product.slug", read_only=True)
    product_name = serializers.CharField(source="product.name", read_only=True)
    product_image = serializers.ImageField(source="product.image", read_only=True)
    product_price = serializers.DecimalField(source="product.price", max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Wishlist
        fields = ["id", "product", "product_name", "product_image", "product_price", "product_slug"]
