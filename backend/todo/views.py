from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Todo
from .serializers import TodoSerializer

class TodoListCreate(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class TodoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class TodoToggleComplete(APIView):
    def put(self, request, pk):
        try:
            todo = Todo.objects.get(pk=pk)
            todo.completed = True
            todo.save()
            serializer = TodoSerializer(todo)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Todo.DoesNotExist:
            return Response({"error": "Todo not found"}, status=status.HTTP_404_NOT_FOUND)
