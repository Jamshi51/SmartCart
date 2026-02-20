from django.db import models
from django.conf import settings


class SellerProfile(models.Model):
    
    user = models.OneToOneField(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE
)

    shop_name = models.CharField(max_length=200)
    business_address = models.TextField()
    bank_account = models.CharField(max_length=50)
    ifsc_code = models.CharField(max_length=20)

    profile_image = models.ImageField(
        upload_to="seller_profiles/",
        blank=True,
        null=True
    )

    def __str__(self):
        return self.user.username
