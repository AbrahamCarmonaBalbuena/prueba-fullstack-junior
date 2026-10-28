from rest_framework import serializers
from .models import Producto


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = [
            'id', 'nombre', 'descripcion', 'precio',
            'categoria', 'stock', 'estado', 'fecha_registro',
        ]
        read_only_fields = ['id', 'fecha_registro']

    def validate_precio(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "El precio debe ser mayor a 0."
            )
        return value

    def validate_stock(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "El stock no puede ser negativo."
            )
        return value

    def validate_nombre(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError(
                "El nombre es obligatorio."
            )
        return value.strip()

    def validate_categoria(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError(
                "La categoría es obligatoria."
            )
        return value.strip()