from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)

from rest_framework import serializers


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class AuthAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"

    objects = UserManager()

    def __str__(self):
        return self.email


class Account(models.Model):
    account = models.ForeignKey(AuthAccount, on_delete=models.CASCADE)
    provider = models.CharField(max_length=100, blank=True)


class org(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    admin = models.ForeignKey(AuthAccount, on_delete=models.CASCADE)


"""Serializers"""


class AuthAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthAccount
        exclude = ["password"]


class AccountSerializer(serializers.ModelSerializer):
    account = AuthAccountSerializer()

    class Meta:
        model = Account
        fields = "__all__"
        depth = 2


class orgSerializer(serializers.ModelSerializer):
    class Meta:
        model = org
        fields = "__all__"
        depth = 2
