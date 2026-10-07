from django.shortcuts import render
from app1.models import Task
from app1.serializers import TaskSerializer,UserSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.http import Http404
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class RegisterUser(APIView):
    def post(self,request):
        user= UserSerializer(data=request.data)
        if user.is_valid():
            user.save()
            return Response({'msg':'registered'},status=status.HTTP_201_CREATED)

class TaskList(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        t=Task.objects.filter(user=request.user)
        s= TaskSerializer(tasks,many=True)
        return Response(s.data,status=status.HTTP_200_OK)
    def post(self,request):
        s=TaskSerializer(data=request.data)
        if s.valid():
            s.save(user=request.user)
            return Response(s.data,status=status.HTTP_201_CREATED)
        return Response(s.errors,status=status.HTTP_400_BAD_REQUEST)
class TaskDetails(APIView):
    permission_classes=[IsAuthenticated]
    def get_object(self,pk):
        try:
            return Task.objects.get(pk=pk,user=request.user)
        except:
            raise Http404
    def get(self,request,pk):
        t=self.get_object(pk)
        s=TaskSerializer(t)
        return Response(s.data,status=status.HTTP_200_OK)
    def put(self,request,pk):
        t=self.get_object(pk)
        s=TaskSerializer(t,data=request.data)
        if s.is_valid():
            s.save(user=request.data)
            return Response(s.data,status=status.HTTP_200_OK)
        
    def delete(self,request,pk):
        t=self.get_object(pk)
        s=TaskSerializer(t,data=request.data)
        return Response({'msg':'task deleted'},status=status.HTTP_404_NOT_FOUND)

class Searchtask(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
       query=self.request.query_params.get('search')
       if query:
           task=Task.objects.filter(title__icontains=query
                                   )
           if not books.exists():
               return Response({'msg': 'no search results'}, status=status.HTTP_200_OK)
           s=TaskSerializer(task,many=True,context={'request':request})
           return Response(b.data,status=status.HTTP_200_OK)
       else:
           return Response({'msg':'no search results'},status=status.HTTP_200_OK)
    
class Logout(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        self.request.auth_token.delete()
        return Response({'msg':'task deleted'},status=status.HTTP_404_NOT_FOUND)


