from django.db import models


class Producto(models.Model):
    ESTADO_CHOICES = [
        ('activo', 'Activo'),
        ('inactivo', 'Inactivo'),
    ]

    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=12, decimal_places=2)
    categoria = models.CharField(max_length=100)
    stock = models.IntegerField()
    estado = models.CharField(
        max_length=10,
        choices=ESTADO_CHOICES,
        default='activo',
    )
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre