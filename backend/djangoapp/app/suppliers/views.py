from django.shortcuts import render
from rest_framework import viewsets

from .models import SupplierSerializer
from .models import Supplier


class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
