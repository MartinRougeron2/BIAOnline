from django.urls import path
from .views import AccountViewSet, AuthAccountViewSet, orgViewSet

from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r"debug/authentication", AuthAccountViewSet)
router.register(r"debug/accounts", AccountViewSet)
router.register(r"debug/orgs", orgViewSet)

urlpatterns = router.urls
