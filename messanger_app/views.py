import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser , Message
from .serializer import UserSerializer , MessageSerializer


class UserApiView(APIView):

    def get(self, request, *args, **kwargs):
        phone_num = request.query_params.get('phone_num', None)
        email = request.query_params.get('email', None)

        if phone_num:
            return self.get_user_by_phone_number(phone_num)
        elif email: 
            return self.get_user_by_email(email)
        
        return Response({'error': 'Bad Request, no email or username'}, status=status.HTTP_400_BAD_REQUEST)
    
    def get_user_by_email(self,email):
        try: 
            users = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'error': 'No user exist with this email'},status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(users)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def get_user_by_phone_number(self,phone_num): 
        try: 
            users = CustomUser.objects.get(phone_num=phone_num)
        except CustomUser.DoesNotExist:
            return Response({'error': 'No user exist with this phone number'},status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(users)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def delete(self, request, *args, **kwargs):
        user_id = request.query_params.get('user_id', None)

        if not user_id:
            return Response({'error': 'Provide a valid user ID'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'error': 'No user exist with this user ID'},status=status.HTTP_404_NOT_FOUND)

        user.delete()
        return Response({'message':f"User with ID {user_id} Deleted Successfully"},status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        first_name = request.data.get('first_name', None)
        last_name = request.data.get('last_name', None)
        email = request.data.get('email', None)
        phone_num = request.data.get('phone_num', None)
        dob = request.data.get('dob', None)

        if not (first_name and last_name and email and phone_num):
            return Response({'error': 'Provide valid user information'}, status=status.HTTP_400_BAD_REQUEST)
        
        user_serializer = UserSerializer(data={
            'first_name':first_name,
            'last_name':last_name,
            'email':email,
            'phone_num':phone_num,
            'dob':dob
        })

        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data,status=status.HTTP_200_OK)
        
        return Response(user_serializer.errors,status=status.HTTP_400_BAD_REQUEST)




class UserContactsApi(APIView):

    def get(self, request, *args, **kwargs):
        phone_num = request.query_params.get('phone_num', None)
        email = request.query_params.get('email', None)

        if not phone_num and not email:
            return Response({'error': 'Provide either a phone number or email'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(phone_num=phone_num,email=email)
        except CustomUser.DoesNotExist:
            return Response({'error': 'No user exist with this phone number or email'},status=status.HTTP_404_NOT_FOUND)

        user_contacts = user.contacts.all()
        user_contact_serializer = UserSerializer(user_contacts,many=True)
        

        return Response(user_contact_serializer.data,status=status.HTTP_200_OK)
    
    def put(self, request, *args, **kwargs):

        user_id = request.query_params.get('user_id', None)
        contact_id = request.query_params.get('contact_id', None)

        try:
            user = CustomUser.objects.get(id=user_id)
            contact = CustomUser.objects.get(id=contact_id)

        except CustomUser.DoesNotExist:
            return Response({'error':'Bad Request user or contact does not exist'},status=status.HTTP_400_BAD_REQUEST)
        

        user.contacts.add(contact)
        user.save()

        user_serializer = UserSerializer(user)
        return Response(user_serializer.data,status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    



class MessagesApi(APIView):

    def post(self,request, *args,**kwargs):
        sender = request.data.get('sender',None)
        receiver = request.data.get('receiver',None)
        date_time = request.data.get('date_time',None)
        message_data= request.data.get('message_data',None)

        if not (sender and receiver and date_time and message_data):
            return Response({'error' : 'Please provide valid message information'},status.HTTP_400_BAD_REQUEST)

        message_data = {
            'sender' : sender,
            'receiver' : receiver,
            'date_time' : date_time,
            'message_data' : message_data
        }

        message_serializer = MessageSerializer(data=message_data)

        if message_serializer.is_valid():
            message_serializer.save()
            return Response(message_serializer.data,status=status.HTTP_200_OK)

        return Response(message_serializer.errors,status=status.HTTP_400_BAD_REQUEST)  




