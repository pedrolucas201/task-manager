from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Task
        fields = ["id", "title", "description", "completed", "user"]
