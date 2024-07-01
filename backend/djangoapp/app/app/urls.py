"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path

from graphene_django.views import GraphQLView

from rest_framework.authtoken import views

from .settings import DEBUG

from authentication.urls import urlpatterns as authentication_urlpatterns
from activities.urls import urlpatterns as activities_urlpatterns
from assets.urls import urlpatterns as assets_urlpatterns
from billing.urls import urlpatterns as billing_urlpatterns
from dashboard.urls import urlpatterns as dashboard_urlpatterns
from suppliers.urls import urlpatterns as suppliers_urlpatterns
from teams.urls import urlpatterns as teams_urlpatterns

# urlpatterns = [
#     path('admin/', admin.site.urls),

# ]

urlpatterns = (
    authentication_urlpatterns
    + activities_urlpatterns
    + assets_urlpatterns
    + billing_urlpatterns
    + dashboard_urlpatterns
    + suppliers_urlpatterns
    + teams_urlpatterns
)
urlpatterns.append(path("admin/", admin.site.urls))

urlpatterns += [
    path("token/", views.obtain_auth_token),
    path("graphql/", GraphQLView.as_view(graphiql=DEBUG)),
]

if not DEBUG:
    for url in urlpatterns:
        # check if the url contains the debug path and remove it
        if "debug" in url.pattern.regex.pattern:
            urlpatterns.remove(url)
