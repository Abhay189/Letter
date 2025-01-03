from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import register, login, Profile, ContactList

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('profile/', Profile.as_view(), name='profile'),
    path('contacts/', ContactList.as_view(), name='contacts'),
    
]