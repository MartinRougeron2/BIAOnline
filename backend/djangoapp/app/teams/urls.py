from django.urls import path
from .views import TeamViewSet

from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r"debug/teams", TeamViewSet)

urlpatterns = router.urls
