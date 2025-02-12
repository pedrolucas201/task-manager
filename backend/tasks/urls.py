from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import TaskViewSet, register  # ✅ Importando a função de registro

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('', include(router.urls)),  # 🔥 Garante que `tasks/` está disponível corretamente
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # ✅ Gera token de acesso
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # ✅ Atualiza o token
    path('register/', register, name='register'),  # ✅ Rota para registrar usuários
]
