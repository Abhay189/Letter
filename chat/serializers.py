

from rest_framework import serializers
from .models import User,UserContact


class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = '__all__'


class UserContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name', 'last_name']
        


class ContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserContact
        fields = "__all__"

    def validate(self, data):
        # Check if this contact relationship already exists
        if UserContact.objects.filter(user=data['user'], contact=data['contact']).exists():
            raise serializers.ValidationError("This contact already exists.")
        return data 