from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_list, name='product-list'),   # ✅ This is the products API
    path('products_detail/<slug:slug>/', views.product_detail, name='product-detail'),
    path('categories/', views.category_list, name='category-list'),
]

