from django.urls import path
from . import views

urlpatterns = [
     path('user-orders/', views.user_orders, name='user_orders'),
    path('create/', views.create_order, name='create_order'),
    
]