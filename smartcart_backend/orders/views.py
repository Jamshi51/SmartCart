from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer
from products.models import Product

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):

    product_id = request.data.get("product")
    payment_method = request.data.get("payment_method")
    name = request.data.get("name")
    shipping_address = request.data.get("shipping_address")

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    order = Order.objects.create(
    user=request.user,
    product=product,
    name=name,
    shipping_address=shipping_address,
    payment_method=payment_method,
    total_amount=product.price
)

    serializer = OrderSerializer(order)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_orders(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)