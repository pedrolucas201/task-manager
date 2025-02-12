from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializers import TaskSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import AllowAny


@api_view(['POST'])
@permission_classes([AllowAny]) # Permite que usuários não autenticados acessem essa rota
def register(request):
    """
    Endpoint para registrar um novo usuário.
    """
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Nome de usuário e senha são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Usuário já existe."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create(username=username, password=make_password(password))
    return Response({"message": "Usuário criado com sucesso!"}, status=status.HTTP_201_CREATED)


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filtra as tarefas pelo usuário autenticado
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Associa a tarefa ao usuário autenticado
        serializer.save(user=self.request.user)
