from rest_framework import serializers
from .models import SellerProfile

class SellerProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = SellerProfile
        fields = [
            "username",
            "shop_name",
            "business_address",
            "bank_account",
            "ifsc_code",
            "profile_image",
        ]
