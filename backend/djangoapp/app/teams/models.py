from django.db import models
from graphene_django import DjangoObjectType
from rest_framework import serializers

from app.settings import COUNTRIES


class Team(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    contact = models.CharField(max_length=100, blank=True)
    location = models.CharField(choices=COUNTRIES, max_length=100)
    isDeleted = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    createdBy = models.CharField(max_length=100)
    updatedBy = models.CharField(max_length=100)
    deletedBy = models.CharField(max_length=100, blank=True)


"""Serializers"""


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = "__all__"
        depth = 2
