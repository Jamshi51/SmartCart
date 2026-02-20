from rest_framework.permissions import AllowAny 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import RetrieveAPIView

from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def category_list(request):
    categories = Category.objects.all()
    return Response(CategorySerializer(categories, many=True).data)

from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

class ProductListView(ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Product.objects.all()

        search = self.request.GET.get("search")
        category = self.request.GET.get("category")

        if search:
            queryset = queryset.filter(name__icontains=search)

        if category:
            queryset = queryset.filter(category_id=category)

        return queryset


class ProductDetailBySlug(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"






@api_view(['GET'])
def latest_products(request):
    products = Product.objects.all().order_by('-created_at')[:4]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
