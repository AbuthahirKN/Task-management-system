from rest_framework import serializers
from app1.models import Task
from django.contrib.auth.models import User

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields=['id','title','description','status','priority','created_at','due_at']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','email','password']
    def create(self,validated_data):
        user=User.objects.create_user(username=validated_data['username'],email=validated_data['email'],
        password=validated_data['password'])
        return user


