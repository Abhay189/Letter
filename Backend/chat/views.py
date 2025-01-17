# chat/views.py
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from .models import User,UserContact
from .serializers import UserSerializer  , ContactsSerializer , UserContactSerializer
import bcrypt


@api_view(['POST'])
def login(request):
    email = request.data.get('email', "")
    password = request.data.get("password", "")

    if not email:
        return Response({'error': 'Please provide an email address'}, status=status.HTTP_400_BAD_REQUEST)
    if not password:
        return Response({"error": "No password provided"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user_profile = User.objects.get(email=email)

        if bcrypt.checkpw(password.encode('utf-8'), user_profile.password.encode('utf-8')):
            curr_user_serializer = UserSerializer(user_profile)
            return_data = curr_user_serializer.data
            return_data.pop('password')  # Exclude password from the response
            return Response(return_data, status=status.HTTP_200_OK)

        return Response({'error': 'Incorrect password'}, status=status.HTTP_401_UNAUTHORIZED)

    except User.DoesNotExist:
        return Response({"error": "No user found with the provided email"}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST'])
def register(request):
    first_name = request.data.get('first_name', "")
    last_name = request.data.get('last_name', "")
    phone_num = request.data.get('phone_num', "")
    email = request.data.get('email', "")
    password = request.data.get('password', "")

    if not (first_name and last_name and email and password and phone_num):
        return Response(
            {"error": "You must provide values for first name, last name, email, phone number, and password"},
            status=status.HTTP_400_BAD_REQUEST
        )

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    new_user_data = {
        "first_name": first_name,
        "last_name": last_name,
        "phone_num": phone_num,
        "email": email,
        "password": hashed_password
    }

    curr_user_serializer = UserSerializer(data=new_user_data)
    if curr_user_serializer.is_valid():
        curr_user_serializer.save()
        new_user_data.pop('password')
        return Response(new_user_data, status=status.HTTP_201_CREATED)

    return Response(curr_user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Profile(APIView):
    def get(self, request):
        """
        Retrieve the current user's profile based on their user ID.
        """
        user_id = request.query_params.get('user_id', None)

        if not user_id:
            return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(user_id=user_id)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        """
        Update the current user's profile.
        """
        user_id = request.data.get('user_id', None)

        if not user_id:
            return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(user_id=user_id)
            serializer = UserSerializer(user, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
     
class ContactList(APIView):
    """
    List all contacts for a specific user and add a new contact.
    """
    def get(self, request):
        """
        Get a list of all the user's contacts based on user_id.
        """
        user_id = request.query_params.get('user_id', None)

        if not user_id:
            return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(user_id=user_id)  # Fetch the user by user_id
            contacts = user.get_contact_names_and_phone_num()  # Get contacts using the custom method
            return Response(contacts, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        """
        Add a new contact to the user's list.
        """
        user_id = request.data.get('user_id')
        contact_name = request.data.get('contact_name')
        phone_num = request.data.get('phone_num')
        email = request.data.get('email')  # Optional email

        if not (contact_name and phone_num and user_id):
            return Response({"error": "Contact name, phone number, and user ID are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Ensure user_id is an integer
        try:
            user_id = int(user_id)
        except ValueError:
            return Response({"error": "Invalid user ID."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Fetch the user by user_id
            user = User.objects.get(user_id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        # Fetch the contact user by phone number
        try:
            contact_user = User.objects.get(phone_num=phone_num)
        except User.DoesNotExist:
            return Response({"error": "Contact with provided phone number not found."}, status=status.HTTP_404_NOT_FOUND)

        # Ensure the user is not trying to add themselves as a contact
        if user == contact_user:
            return Response({"error": "You cannot add yourself as a contact."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if the contact already exists in the user's contact list
        if UserContact.objects.filter(user=user, contact=contact_user).exists():
            return Response({"error": "Contact already exists in the user's contact list."}, status=status.HTTP_400_BAD_REQUEST)


        # Prepare the data for the serializer
        data = {
            'user': user_id,
            'contact': contact_user.user_id,
            'contact_name': contact_name
        }

        # Add the user ID to the serializer's context
        serializer = UserContactSerializer(data=data, context={'user_id': user_id})

        if serializer.is_valid():
            # Save the new contact
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def put(self, request):
        """
        Update details of a specific contact.
        """
        user_id = request.data.get('user_id')
        contact_phone = request.data.get('phone_num')

        if not (user_id and contact_phone):
            return Response({"error": "Both user_id and contact_phone are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(user_id=user_id)
            contact = User.objects.get(phone_num=contact_phone)

            # Check if the contact exists in the user's contact list
            user_contact = UserContact.objects.get(user=user, contact=contact)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except UserContact.DoesNotExist:
            return Response({"error": "Contact not found in user's contact list."}, status=status.HTTP_404_NOT_FOUND)
        
        # Update the contact details
        serializer = UserContactSerializer(user_contact, data=request.data, partial=True)  # `partial=True` allows updating specific fields
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        """
        Delete a specific contact.
        """
        user_id = request.data.get('user_id')
        contact_phone = request.data.get('phone_num')

        if not (user_id and contact_phone):
            return Response({"error": "Both user_id and contact_phone are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(user_id=user_id)
            contact = User.objects.get(phone_num=contact_phone)

            # Check if the contact exists in the user's contact list
            user_contact = UserContact.objects.get(user=user, contact=contact)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except UserContact.DoesNotExist:
            return Response({"error": "Contact not found in user's contact list."}, status=status.HTTP_404_NOT_FOUND)

        # Delete the contact
        user_contact.delete()
        return Response({"message": "Contact deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
