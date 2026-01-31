from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

@api_view(['GET'])
def category_list(request):
    categories = Category.objects.all()
    return Response(CategorySerializer(categories, many=True).data)


@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()

    # 🔹 query params
    category = request.GET.get('category')
    search = request.GET.get('search')
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')

    # 🔹 filter by category (slug OR name)
    if category:
        products = products.filter(category__slug=category)

    # 🔹 search by product name
    if search:
        products = products.filter(name__icontains=search)

    # 🔹 price filters
    if min_price:
        products = products.filter(price__gte=min_price)

    if max_price:
        products = products.filter(price__lte=max_price)

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug)
    return Response(ProductSerializer(product).data)
