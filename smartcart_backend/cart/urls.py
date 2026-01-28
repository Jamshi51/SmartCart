from django.urls import path
from . import views

urlpatterns = [
    path('my_cart/', views.my_cart, name='my_cart'),
    path('add_to_cart/', views.add_to_cart, name='add_to_cart'),
    path('remove_from_cart/', views.remove_from_cart, name='remove_from_cart'),
    path('update_cart_item/', views.update_cart_item, name='update_cart_item'),
]
