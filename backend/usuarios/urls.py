from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegistroView, UsuarioViewSet

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')

urlpatterns = [
    path('registro/', RegistroView.as_view(), name='registro'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]