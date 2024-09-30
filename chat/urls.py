# chat/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import UserLogin,UserSignup

urlpatterns = [
    # path("", views.index, name="index"),
    # path("<str:room_name>/", views.room, name="room"),
    path("login/", views.login, name="login"),
    path('api/login', UserLogin.as_view()),
    path("api/signup", UserSignup.as_view())
    
]