from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.views.decorators.csrf import csrf_exempt
from . import views

router = DefaultRouter()


urlpatterns = [
    path('', include(router.urls)),
    path('bbox', views.detect_spills),

]