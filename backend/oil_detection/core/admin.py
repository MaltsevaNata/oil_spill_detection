from django.contrib import admin

from .models import OilSpill, Region, OilSpillRegion

admin.site.register(OilSpill)
admin.site.register(Region)
admin.site.register(OilSpillRegion)
