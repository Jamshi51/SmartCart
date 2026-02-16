import uuid
from django.db import models
from django.conf import settings
from products.models import Product



class Order(models.Model):

    PAYMENT_CHOICES = [
        ('COD', 'Cash on Delivery'),
        ('ONLINE', 'Online Payment'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    name = models.CharField(max_length=255, null=True, blank=True)
    shipping_address = models.TextField(null=True, blank=True)
    quantity = models.IntegerField(default=1)


    payment_method = models.CharField(max_length=10, choices=PAYMENT_CHOICES)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)
    

    @property
    def formatted_order_id(self):
        return f"ORD-{str(self.id).zfill(6)}"


