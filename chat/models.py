

from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_num = models.CharField(max_length=20,unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.email}"
    
