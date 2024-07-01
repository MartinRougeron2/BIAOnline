from django.db import models
from rest_framework import serializers


class Supplier(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    country = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    isGDPRCompliant = models.BooleanField()
    isSOXCompliant = models.BooleanField()
    isPCICompliant = models.BooleanField()
    isHIPAACompliant = models.BooleanField()
    RTO = models.IntegerField()
    RPO = models.IntegerField()
    isDeleted = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    createdBy = models.CharField(max_length=100)
    updatedBy = models.CharField(max_length=100)
    deletedBy = models.CharField(max_length=100, blank=True)
    tags = models.JSONField()

    def __str__(self):
        return self.name


"""Serializers"""


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = "__all__"
        depth = 2
