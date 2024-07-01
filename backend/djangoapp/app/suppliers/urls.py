from django.urls import path
from .views import SupplierViewSet

from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r"debug/suppliers", SupplierViewSet)

urlpatterns = router.urls
