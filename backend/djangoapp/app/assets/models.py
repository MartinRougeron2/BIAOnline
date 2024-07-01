from django.db import models
from suppliers.models import Supplier
from rest_framework import serializers


class Asset(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    description = models.TextField()
    contact = models.CharField(max_length=100)
    supplier = models.ForeignKey(Supplier, on_delete=models.PROTECT)
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
    activitySpecific = models.CharField(max_length=100)
    tags = models.JSONField()

    def __str__(self):
        return self.name


"""Serializers"""


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = "__all__"
        depth = 2
