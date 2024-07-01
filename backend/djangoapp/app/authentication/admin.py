from django.contrib import admin
from .models import Account, org, AuthAccount
from django.contrib.admin.models import LogEntry

admin.site.register(Account)
admin.site.register(AuthAccount)
admin.site.register(org)
admin.site.register(LogEntry)
