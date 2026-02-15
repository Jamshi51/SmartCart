from django.contrib import admin
from .models import Order

class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'product',
        'payment_method',
        'total_amount',
        'created_at'
    )
    search_fields = ('order_id', 'user__username')
    list_filter = ('payment_method', 'created_at')

admin.site.register(Order, OrderAdmin)
