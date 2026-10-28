from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductoViewSet, DashboardStatsView

router = DefaultRouter()
router.register(r'productos', ProductoViewSet, basename='producto')

urlpatterns = [
    path('dashboard/', DashboardStatsView.as_view(), name='dashboard'),
    path('', include(router.urls)),
]