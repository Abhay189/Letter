from django.urls import  path, include
from . import views
from .views import MessagesApi, UserApiView,UserContactsApi

urlpatterns = [
    path("", UserApiView.as_view()),
    path("contacts", UserContactsApi.as_view()),
    path("message", MessagesApi.as_view())

]