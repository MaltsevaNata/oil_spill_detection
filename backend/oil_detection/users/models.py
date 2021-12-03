from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User

from core.models import Region


class Profile(models.Model):
    user = models.OneToOneField(
        verbose_name='Django User',
        to=get_user_model(),
        on_delete=models.CASCADE
    )

    phone = models.CharField(max_length=12)

    objects = models.Manager()

    def mark_for_delete(self):
        self.marked_for_delete = True
        self.save()

    @staticmethod
    def get_str_representation_for_user(instance):
        try:
            return instance.profile.full_name
        except Exception as e:
            return "No name"

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

    class Meta:
        app_label = "users"
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'


class ROLES(models.TextChoices):
    ADMIN = 'admin',
    REGIONAL_AGENT = 'regional_agent'
    FEDERAL_AGENT = 'federal_agent'


class Role(models.Model):
    name = models.CharField(max_length=255, choices=ROLES.choices)

    def __str__(self):
        return f"{self.name}"


class UserRole(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'User Role relation'
        verbose_name_plural = 'User Role relations'

    def __str__(self):
        return f"{self.user}: {self.role}"


class UserRegion(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'User Region relation'
        verbose_name_plural = 'User Region relations'

    def __str__(self):
        return f"{self.user}: {self.region}"