from django.contrib.auth.models import AbstractUser
from django.db import models


class Usuario(AbstractUser):
    """
    Extiende el usuario de Django para agregar el campo 'activo',
    que permite desactivar usuarios en lugar de borrarlos.
    """
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.username