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
        s= TaskSerializer(t,many=True)
        return Response(s.data,status=status.HTTP_200_OK)
    def post(self,request):
        s=TaskSerializer(data=request.data)
        if s.is_valid():
            s.save(user=request.user)
            return Response(s.data,status=status.HTTP_201_CREATED)
        return Response(s.errors,status=status.HTTP_400_BAD_REQUEST)
class TaskDetails(APIView):
    permission_classes=[IsAuthenticated]
    def get_object(self,request,pk):
        try:
            return Task.objects.get(pk=pk,user=request.user)
        except Task.DoesNotExist:
            raise Http404
    def get(self,request,pk):
        t=self.get_object(request,pk)
        s=TaskSerializer(t)
        return Response(s.data,status=status.HTTP_200_OK)
    def put(self,request,pk):
        t=self.get_object(request,pk)
        s=TaskSerializer(t,data=request.data)
        if s.is_valid():
            s.save(user=request.user)
            return Response(s.data,status=status.HTTP_200_OK)
        return Response(s.errors,status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self,request,pk):
        t=self.get_object(request,pk)
        t.delete
        return Response({'msg':'task deleted'},status=status.HTTP_404_NOT_FOUND)

class Searchtask(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        title_param = request.query_params.get('title')
        status_param = request.query_params.get('status')
        priority_param = request.query_params.get('priority')

        queryset =Task.objects.filter(user=request.user)
        if title_param:
            queryset=queryset.filter(title__icontains=title_param)
        if status_param:
            queryset=queryset.filter(status__icontains=status_param)  
        if priority_param:
            queryset=queryset.filter(priority__icontains=priority_param)
        if not queryset.exists():
            return Response({'msg':'no search results'},status=status.HTTP_200_OK)
        s=TaskSerializer(queryset,many=True,context={'request':request})
        return Response(s.data,status=status.HTTP_200_OK)

class Logout(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        self.request.auth_token.delete()
        return Response({'msg':'task deleted'},status=status.HTTP_404_NOT_FOUND)


