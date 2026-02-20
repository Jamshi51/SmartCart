from django.urls import path
from .views import SellerProfileView

urlpatterns = [
    path("profile/", SellerProfileView.as_view()),
]
