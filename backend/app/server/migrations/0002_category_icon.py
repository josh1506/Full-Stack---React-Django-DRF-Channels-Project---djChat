# Generated by Django 5.0.6 on 2024-05-25 10:18

import app.server.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='icon',
            field=models.FileField(blank=True, null=True, upload_to=app.server.models.category_icon_update_path),
        ),
    ]
