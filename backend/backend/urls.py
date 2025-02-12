from django.contrib import admin
from django.urls import path, include
from tasks.views import register  # ✅ Importando a função de registro

urlpatterns = [
    path('admin/', admin.site.urls),  # Painel de administração
    path('api/', include('tasks.urls')),  # 🔥 Inclui todas as rotas definidas no `tasks/urls.py`
    path('api/register/', register, name='register'),  # ✅ Rota para registrar usuários
]
