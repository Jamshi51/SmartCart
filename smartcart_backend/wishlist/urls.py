from django.urls import path
from .views import toggle_wishlist, wishlist_list,wishlist_detail

urlpatterns = [
    path("", wishlist_list),
    path("toggle/", toggle_wishlist),
    
    
]
