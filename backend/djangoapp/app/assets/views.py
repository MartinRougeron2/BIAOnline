from django.shortcuts import render
from rest_framework import viewsets

from .models import AssetSerializer
from .models import Asset


class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
