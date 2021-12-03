from django.contrib import admin
from django.urls import path, include
import debug_toolbar
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('admin/', admin.site.urls),
    path('__debug__/', include(debug_toolbar.urls)),
    path('api/', include('core.urls')),
]


