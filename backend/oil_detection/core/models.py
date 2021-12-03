from django.db import models


class Region(models.Model):
    name = models.CharField(max_length=255, default="None")
    coordinate_x = models.FloatField()
    coordinate_y = models.FloatField()

    def __str__(self):
        return f"{self.name}"


class OilSpill(models.Model):
    coordinate_x = models.FloatField()
    coordinate_y = models.FloatField()
    surface_area = models.FloatField()
    timestamp = models.DateTimeField()

    def __str__(self):
        return f"({self.coordinate_x}, {self.coordinate_y})"


class OilSpillRegion(models.Model):
    oil_spill = models.ForeignKey(OilSpill, on_delete=models.CASCADE)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Oil spill Region relation'
        verbose_name_plural = 'Oil spill Region relations'

    def __str__(self):
        return f"{self.oil_spill} {self.region.name}"
