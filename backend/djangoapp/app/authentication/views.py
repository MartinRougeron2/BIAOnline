from django.shortcuts import render
from rest_framework import viewsets

from .models import AccountSerializer, AuthAccountSerializer, orgSerializer
from .models import Account, AuthAccount, org


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class AuthAccountViewSet(viewsets.ModelViewSet):
    queryset = AuthAccount.objects.all()
    serializer_class = AuthAccountSerializer


class orgViewSet(viewsets.ModelViewSet):
    queryset = org.objects.all()
    serializer_class = orgSerializer
