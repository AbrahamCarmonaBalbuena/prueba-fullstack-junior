from rest_framework import viewsets, generics, permissions
from rest_framework.permissions import IsAuthenticated
from .models import Usuario
from .serializers import RegistroSerializer, UsuarioSerializer

class RegistroView(generics.CreateAPIView):
    """
    POST /api/registro/
    Crea un usuario nuevo. No requiere autenticación.
    """
    serializer_class = RegistroSerializer
    permission_classes = [permissions.AllowAny]

class UsuarioViewSet(viewsets.ModelViewSet):
    """
    CRUD para administración de usuarios.
    """
    queryset = Usuario.objects.all().order_by('id')
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]

    def perform_destroy(self, instance):
        # En lugar de borrar, solo lo desactivamos
        instance.activo = False
        instance.is_active = False # también el campo de Django
        instance.save()