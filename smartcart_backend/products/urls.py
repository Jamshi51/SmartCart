from django.urls import path
from . import views
from .views import ProductDetailBySlug

urlpatterns = [
    path('', views.product_list, name='product-list'),   # ✅ This is the products API
  
    path("<slug:slug>/", ProductDetailBySlug.as_view()),

    path('categories/', views.category_list, name='category-list'),
]

