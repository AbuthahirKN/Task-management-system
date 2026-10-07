from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Task(models.Model):

    user=models.ForeignKey(User,on_delete=models.CASCADE)
    title= models.CharField(max_length=100)
    statuschoice=(('todo','Todo'),('in progress','In Progress'),('completed','Completed'))
    prioritychoice=(('low','Low'),('medium','Medium'),('high','High'))
    description=models.TextField(blank=True)
    status=models.CharField(max_length=25,choices=statuschoice,default='in progress')
    priority=models.CharField(max_length=25,choices=prioritychoice,default='medium')
    created_at=models.DateTimeField(auto_now_add=True)
    due_at = models.DateField(blank=True)
    def __str__(self):
        return self.title