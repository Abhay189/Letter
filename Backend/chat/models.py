from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_num = models.CharField(max_length=20,unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    contacts = models.ManyToManyField(
        'self',  # Reference to the same model
        through='UserContact',
        symmetrical=False,  # Set to False for a one-way relationship
        related_name='contact_set',  # Reverse relation name
        blank=True  # Allow the field to be optional
    )
    
    def get_contact_names_and_phone_num(self):
        contacts = UserContact.objects.filter(user=self)
        return_contact = []
        for contact in contacts:
            contact_user = contact.contact
            return_contact.append({
                "contact_name":contact.contact_name,
                "contact_phone_num":contact_user.phone_num
            })

        return return_contact

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.email}"


class UserContact(models.Model):
    user = models.ForeignKey(User, related_name='user_contacts', on_delete=models.CASCADE)
    contact = models.ForeignKey(User, related_name='contact_users', on_delete=models.CASCADE)
    contact_name = models.CharField(max_length=50)  # Field to store custom contact name

    class Meta:
        unique_together = ('user', 'contact')  # Prevent duplicate contacts for the same user

    def __str__(self):
        return f"{self.user.first_name} -> {self.contact.first_name}"


class Conversation(models.Model):
    conversation_id = models.AutoField(primary_key=True)
    conversation_name = models.CharField(max_length=150,blank=True)
    creator = models.ForeignKey(User,related_name='created_conversations',on_delete=models.CASCADE)
    creation_date = models.DateField(auto_now_add=True)
    participants = models.ManyToManyField(User, related_name='conversations')
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.conversation_name
    

class Message(models.Model):
    message_id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(User,related_name="sent_messages",on_delete=models.CASCADE)
    conversation = models.ForeignKey(Conversation,related_name="messages",on_delete=models.CASCADE)
    date_time = models.DateTimeField(auto_now_add=True)
    read_by = models.ManyToManyField(User,related_name='read_messages',blank=True)
    message_content = models.TextField()

    class Meta:
        ordering = ['date_time']  # Sort messages by date and time

    def __str__(self):
        return f"Message from {self.sender.first_name} in {self.conversation.conversation_name} at {self.date_time}"

