from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Producto
from django.db.models import Count, Sum, F
from rest_framework.views import APIView
from rest_framework.response import Response
from usuarios.models import Usuario
from .serializers import ProductoSerializer


class ProductoViewSet(viewsets.ModelViewSet):
    """
    CRUD completo de productos.
    GET /productos/          -> listar (paginado)
    POST /productos/         -> crear
    GET /productos/{id}/     -> detalle
    PUT /productos/{id}/     -> actualizar completo
    PATCH /productos/{id}/   -> actualizar parcial
    DELETE /productos/{id}/  -> eliminar
    """
    queryset = Producto.objects.all().order_by('-fecha_registro')
    serializer_class = ProductoSerializer
    permission_classes = [IsAuthenticated]

class DashboardStatsView(APIView):
    def get(self, request):
        total_productos = Producto.objects.count()
        total_usuarios = Usuario.objects.count()
        
        # Reporte 1: Productos y stock por categoría (solo activos)
        reporte_categorias = Producto.objects.filter(estado='activo') \
            .values('categoria') \
            .annotate(
                cantidad=Count('id'),
                stock_total=Sum('stock'),
                valor_inventario=Sum(F('precio') * F('stock'))
            ).order_by('-cantidad')

        return Response({
            'total_productos': total_productos,
            'total_usuarios': total_usuarios,
            'reporte_categorias': reporte_categorias
        })