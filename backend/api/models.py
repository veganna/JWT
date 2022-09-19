from django.db import models
from authentication.models import User

# Create your models here.

class Journal(models.Model):
    title           = models.CharField(max_length=100)
    description     = models.TextField()
    mood            = models.CharField(max_length=255)
    weather         = models.CharField(max_length=255)
    content         = models.TextField() 
    creation_date   = models.DateField(auto_now_add=True)


    user            = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    def get_user(self):
        return self.user

    class Meta:
        ordering = ['-creation_date']
