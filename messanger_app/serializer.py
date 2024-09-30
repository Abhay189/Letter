from rest_framework import serializers
from .models import CustomUser, Message


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Message
        fields = '__all__'
    