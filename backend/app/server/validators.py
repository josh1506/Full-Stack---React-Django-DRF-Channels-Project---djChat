import os

from django.core.exceptions import ValidationError

from PIL import Image


def validate_icon_image_size(image):
    if image is not None:
        with Image.open(image) as image:
            if image.width > 70 or image.height > 70:
                raise ValidationError(
                    f"The maximum allowed dimensions for the image are 70x70 - size of image you uploaded: {image.size}")


def validate_image_file_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = [".jpg", ".jpeg", ".png", ".gif"]
    if ext.lower() not in valid_extensions:
        raise ValidationError(
            f"The extension you uploaded: {ext} is not allowed"
        )
