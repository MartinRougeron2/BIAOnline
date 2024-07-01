from django.urls import path
from .views import AssetViewSet

from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r"debug/assets", AssetViewSet)

urlpatterns = router.urls
