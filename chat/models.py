

from django.db import models

class User(models.Model):
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
    
    def get_contact_names_and_id(self):
        contacts = UserContact.objects.filter(user=self).values_list('contact_name','contact')
        return_contact = []
        for contact in contacts:
            return_contact.append({
                "contact_name":contact[0],
                "contact_id":contact[1]
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