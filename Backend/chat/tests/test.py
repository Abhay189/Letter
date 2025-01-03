from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from ..models import User,UserContact
import bcrypt
from django.urls import reverse

class LoginAPITest(TestCase):
    
    def setUp(self):
        # Initialize the API client
        self.client = APIClient()

        # Create a test user
        self.password = "securepassword"
        hashed_password = bcrypt.hashpw(self.password.encode('utf-8'), bcrypt.gensalt())
        self.user = User.objects.create(
            user_id = 55,
            first_name = "john",
            last_name = "doe",
            phone_num = "1234567891",
            email = "john_doe@gmail.com",
            password=hashed_password.decode('utf-8')
        )

        # Define the login endpoint
        self.login_url = "/api/login/"

    def test_login_success(self):
        # Test successful login
        data = {"email": "john_doe@gmail.com", "password": self.password}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("user_id", response.data)

    def test_login_failure_incorrect_password(self):
        # Test login with incorrect password
        data = {"email": "john_doe@gmail.com", "password": "wrongpassword"}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("error", response.data)

    def test_login_failure_no_email(self):
        # Test login without providing an email
        data = {"password": self.password}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

    def test_login_failure_wrong_email(self):
        # Test login without providing an email
        data = {"email": "wrong_doe@gmail.com", "password": self.password}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("error", response.data)

class RegisterAPITest(TestCase):

    def setUp(self):
        # Initialize the API client
        self.client = APIClient()
        self.register_url = "/api/register/"

    def test_register_success(self):
        # Test successful user registration
        data = {
            "first_name": "John",
            "last_name": "Doe",
            "phone_num": "1234567891",
            "email": "john_doe@gmail.com",
            "password": "securepassword"
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("first_name", response.data)
        self.assertIn("last_name", response.data)
        self.assertNotIn("password", response.data)  # Ensure password is not in response

    def test_register_missing_fields(self):
        # Test registration with missing fields
        data = {
            "first_name": "John",
            "email": "john_doe@gmail.com",
            "password": "securepassword"
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

    def test_register_invalid_email(self):
        # Test registration with an invalid email
        data = {
            "first_name": "John",
            "last_name": "Doe",
            "phone_num": "1234567891",
            "email": "invalid-email",
            "password": "securepassword"
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    def test_register_duplicate_email(self):
        # Test registration with a duplicate email
        User.objects.create(
            first_name="Jane",
            last_name="Doe",
            phone_num="9876543210",
            email="jane_doe@gmail.com",
            password="securepassword"
        )
        data = {
            "first_name": "John",
            "last_name": "Doe",
            "phone_num": "1234567891",
            "email": "jane_doe@gmail.com",
            "password": "securepassword"
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

class ProfileAPITest(TestCase):

    def setUp(self):
        # Initialize the API client
        self.client = APIClient()

        # Create a test user
        self.user_data = {
            'user_id': 1,
            'first_name': 'John',
            'last_name': 'Doe',
            'phone_num': '1234567891',
            'email': 'john_doe@gmail.com',
            'password': 'securepassword'
        }
        self.user = User.objects.create(**self.user_data)
        
        # Define URLs for testing
        self.profile_url = '/api/profile/'

    def test_get_profile_success(self):
        """
        Test retrieving the profile of an existing user.
        """
        response = self.client.get(self.profile_url, {'user_id': self.user.user_id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user_id'], self.user.user_id)

    def test_get_profile_user_not_found(self):
        """
        Test retrieving the profile with a non-existing user_id.
        """
        response = self.client.get(self.profile_url, {'user_id': 999})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'User not found.')

    def test_get_profile_missing_user_id(self):
        """
        Test retrieving the profile without providing the user_id.
        """
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'User ID is required.')

    def test_put_profile_success(self):
        """
        Test updating the profile of an existing user.
        """
        update_data = {
            'user_id': self.user.user_id,
            'phone_num': '9876543210',
            'email': 'john_new_email@gmail.com'
        }
        response = self.client.put(self.profile_url, update_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['phone_num'], '9876543210')
        self.assertEqual(response.data['email'], 'john_new_email@gmail.com')

    def test_put_profile_user_not_found(self):
        """
        Test updating a non-existing user's profile.
        """
        update_data = {
            'user_id': 999,  # Non-existing user_id
            'phone_num': '9876543210',
            'email': 'non_existing_email@gmail.com'
        }
        response = self.client.put(self.profile_url, update_data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'User not found.')

    def test_put_profile_missing_user_id(self):
        """
        Test updating the profile without providing the user_id.
        """
        update_data = {
            'phone_num': '9876543210',
            'email': 'missing_user_id_email@gmail.com'
        }
        response = self.client.put(self.profile_url, update_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'User ID is required.')

    def test_put_profile_partial_update(self):
        """
        Test partial update of user profile (e.g., update only the phone number).
        """
        update_data = {
            'user_id': self.user.user_id,
            'phone_num': '1231231234'
        }
        response = self.client.put(self.profile_url, update_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['phone_num'], '1231231234')
        self.assertEqual(response.data['email'], self.user.email)  # Email should remain unchanged

class ContactListTests(TestCase):

    def setUp(self):
        # Set up sample users for testing
        self.user1 = User.objects.create(
            first_name="John",
            last_name="Doe",
            phone_num="1234567890",
            email="john.doe@example.com",
            password="password"
        )
        self.user2 = User.objects.create(
            first_name="Jane",
            last_name="Doe",
            phone_num="0987654321",
            email="jane.doe@example.com",
            password="password"
        )

        self.contacts_url = '/api/contacts/'

    def test_get_contacts_for_valid_user(self):
        """ Test fetching contacts for a valid user """
        UserContact.objects.create(user=self.user1, contact=self.user2, contact_name="Jane")
        
        url = f"{self.contacts_url}?user_id={self.user1.user_id}"
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['contact_name'], "Jane")
        self.assertEqual(response.data[0]['contact_phone_num'], "0987654321")

    def test_get_contacts_for_invalid_user(self):
        """ Test fetching contacts for a user that does not exist """
        url = f"{self.contacts_url}?user_id=999999"
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["error"], "User not found.")

    def test_get_contacts_without_user_id(self):
        """ Test missing user_id in GET request """
        url = self.contacts_url
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "User ID is required.")

    def test_get_contacts_for_user_with_no_contacts(self):
        """ Test fetching contacts for a user with no contacts """
        url = f"{self.contacts_url}?user_id={self.user1.user_id}"
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_post_add_contact_for_valid_user(self):
        """ Test adding a new contact to a user's contact list """
        url = self.contacts_url
        data = {
            "user_id": self.user1.user_id,
            "contact_name": "Jane",
            "phone_num": "0987654321",
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['contact_name'], "Jane")

    def test_post_add_contact_for_user_that_does_not_exist(self):
        """ Test adding a contact for a user that does not exist """
        url = self.contacts_url
        data = {
            "user_id": 999999,  # Invalid user_id
            "contact_name": "Jane",
            "phone_num": "0987654321",
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["error"], "User not found.")

    def test_post_add_contact_with_invalid_phone_number(self):
        """ Test adding a contact using a phone number that does not exist """
        url = self.contacts_url
        data = {
            "user_id": self.user1.user_id,
            "contact_name": "John",
            "phone_num": "1112223333",  # Invalid phone number
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["error"], "Contact with provided phone number not found.")

    def test_post_add_contact_for_same_user(self):
        """ Test trying to add the user as their own contact """
        url = self.contacts_url
        data = {
            "user_id": self.user1.user_id,
            "contact_name": "John",
            "phone_num": "1234567890",  # Same phone number as user1
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "You cannot add yourself as a contact.")

    def test_post_add_contact_without_required_fields(self):
        """ Test adding a contact without required fields """
        url = self.contacts_url
        data = {
            "user_id": self.user1.user_id,
            "contact_name": "Jane",  # Missing phone_num
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "Contact name, phone number, and user ID are required.")

    def test_post_add_duplicate_contact(self):
        """ Test adding a duplicate contact """
        UserContact.objects.create(user=self.user1, contact=self.user2, contact_name="Jane")
        
        url = self.contacts_url
        data = {
            "user_id": self.user1.user_id,
            "contact_name": "Jane",
            "phone_num": "0987654321",
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "Contact already exists in the user's contact list.")