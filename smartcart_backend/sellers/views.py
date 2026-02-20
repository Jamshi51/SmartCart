from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import SellerProfile
from .serializers import SellerProfileSerializer
from rest_framework.parsers import MultiPartParser, FormParser

class SellerProfileView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        profile, created = SellerProfile.objects.get_or_create(
            user=request.user
        )
        serializer = SellerProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
        profile, created = SellerProfile.objects.get_or_create(
            user=request.user
        )

        serializer = SellerProfileSerializer(
            profile,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

