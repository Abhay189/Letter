from django.db import models

# Create your models here.


class CustomUser(models.Model) : 
    first_name = models.CharField(max_length=70)
    last_name = models.CharField(max_length=70)
    email = models.EmailField(max_length=70, unique=True)
    phone_num = models.CharField(max_length=20 , unique=True)
    dob = models.DateField(null=True)
    contacts = models.ManyToManyField("self",symmetrical=False,blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"



class Message(models.Model):
    sender = models.ForeignKey(CustomUser,on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(CustomUser,on_delete=models.CASCADE, related_name='recieved_messages')
    date_time = models.DateTimeField()
    message_data = models.CharField(max_length=2000,null=True)

    def __str__(self):
        return f"Message sent from {self.sender} to {self.receiver} on {self.date_time}"



