from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserContact, register, login

urlpatterns = [
    path("api/contacts", UserContact.as_view()),
    path('register/', register, name='register'),
    path('login/', login, name='login')
]