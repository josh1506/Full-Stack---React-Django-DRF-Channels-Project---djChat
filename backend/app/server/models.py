from django.db import models
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.dispatch import receiver

from .validators import validate_icon_image_size, validate_image_file_extension


def server_banner_update_path(instance, filename):
    return f"server/${instance.id}/server_banner/{filename}"


def server_icon_update_path(instance, filename):
    return f"server/${instance.id}/server_icon/{filename}"


def category_icon_update_path(instance, filename):
    return f"category/${instance.id}/category_icon/{filename}"


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    icon = models.FileField(upload_to=category_icon_update_path, blank=True, null=True)

    def save(self, *args, **kwargs):
        # This will prevent storage for multiple icons save in user icon folder
        # Delete old icon if category exists and has a new icon
        if self.id is not None:
            existing_category = get_object_or_404(Category, id=self.id)
            if existing_category.icon != self.icon:
                existing_category.icon.delete(save=False)
        super(Category, self).save(*args, **kwargs)

    @receiver(models.signals.pre_delete, sender="server.Category")
    def category_delete_files(sender, instance, **kwargs):
        for field in instance._meta.fields:
            if field.name == "icon":
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)

    def __str__(self):
        return self.name


class Server(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True,
                              related_name='server_owner')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='server_category')
    description = models.TextField(max_length=250, blank=True, null=True)
    member = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='server_members')

    def __str__(self):
        return self.name


class Channel(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True,
                              related_name='channel_owner')
    topic = models.CharField(max_length=100)
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name='channel_server')
    banner = models.ImageField(upload_to=server_banner_update_path, blank=True, null=True,
                               validators=[validate_image_file_extension])
    icon = models.ImageField(upload_to=server_icon_update_path, blank=True, null=True,
                             validators=[validate_icon_image_size, validate_image_file_extension])

    def save(self, *args, **kwargs):
        # This will prevent storage for multiple icons save in user icon folder
        # Delete old icon if category exists and has a new icon
        self.name = self.name.lower()
        if self.id is not None:
            existing_channel = get_object_or_404(Channel, id=self.id)
            if existing_channel.icon != self.icon:
                existing_channel.icon.delete(save=False)
            if existing_channel.banner != self.banner:
                existing_channel.banner.delete(save=False)
        super(Channel, self).save(*args, **kwargs)

    @receiver(models.signals.pre_delete, sender="server.Server")
    def category_delete_files(sender, instance, **kwargs):
        for field in instance._meta.fields:
            if field.name == "icon" or field.name == "banner":
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)

    def __str__(self):
        return self.name
