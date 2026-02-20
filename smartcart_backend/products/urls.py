from django.urls import path
from . import views
from .views import ProductDetailBySlug,ProductListView,latest_products

urlpatterns = [
    path("", ProductListView.as_view()),

    path('categories/', views.category_list, name='category-list'),
    path("<slug:slug>/", ProductDetailBySlug.as_view()),
    path("latest/", latest_products),

   
]

