from django.urls import path
from .views import ActivityViewSet

from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r"debug/activities", ActivityViewSet)

urlpatterns = router.urls
