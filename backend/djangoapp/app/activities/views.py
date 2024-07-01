from django.shortcuts import render
from rest_framework import viewsets

from .models import ActivitySerializer
from .models import Activity


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
