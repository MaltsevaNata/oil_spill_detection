from django.contrib import admin

from .models import Profile, Role, UserRole, UserRegion

admin.site.register(Profile)
admin.site.register(Role)
admin.site.register(UserRole)
admin.site.register(UserRegion)
