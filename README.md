## Introduction

**Letter** is a real-time messaging application designed for seamless communication. Users can register, log in, create and manage their profiles, and interact with contacts and conversations. The platform supports individual and group chats, enabling users to form groups with other individuals for dynamic communication. With built-in data saving capabilities, users never have to worry about storing their messages locally.

Built with a **Django** backend and **React** frontend, Letter offers an API-driven architecture that can easily be expanded to include features like real-time messaging, group chats, and more. This web-based application ensures a smooth, secure, and scalable communication experience for users, providing everything needed for efficient, real-time interaction without the hassle of local data storage.

![App Screenshot 1](./Assets/Signup%20page.png)
![App Screenshot 2](./Assets/chats%20screen.png)

## Project Structure

### Backend

The backend is built with **Django** and exposes a RESTful API using the **Django REST Framework**. It is responsible for managing user authentication, profiles, contacts, conversations, and messages.

**File Structure**:
```
Backend/
  ├── chat/                  # Core logic of the application
  │   ├── migrations/        # Database migrations
  │   ├── static/            # Static files for the chat app
  │   ├── templates/         # Template files for the chat app
  │   ├── tests/             # Unit and integration tests
  │   ├── __pycache__/       # Compiled Python files
  │   ├── admin.py           # Django admin interface configuration
  │   ├── consumers.py       # WebSocket consumers for real-time features
  │   ├── models.py          # Models for User, Contact, and Conversation
  │   ├── routing.py         # WebSocket routing for real-time communication
  │   ├── serializers.py     # Serializers for User, Contact, and Message
  │   ├── urls.py            # URL routing for the chat app
  │   ├── views.py           # Views for handling requests
  │   └── __init__.py        # Initialization file
  ├── messanger/             # Main project settings
  │   ├── __pycache__/       # Compiled Python files
  │   ├── asgi.py            # ASGI configuration
  │   ├── settings.py        # Django settings
  │   ├── urls.py            # Main URL routing for the app
  │   ├── wsgi.py            # WSGI configuration
  │   └── __init__.py        # Initialization file
  ├── myenv/                 # Virtual environment for dependencies
  ├── .dockerignore          # Files to be excluded from Docker build
  ├── .gitignore             # Git ignore rules
  ├── Dockerfile             # Docker configuration for the backend
  ├── docker-compose.yml     # Docker Compose configuration to run the backend
  ├── manage.py              # Django project management script
  ├── py-requirements.txt    # Python dependencies
```

### Frontend

The frontend is a **React** application that communicates with the backend API to display data and enable user interactions.

**File Structure**:
```
frontend/
  ├── public/              # Public assets and index.html
  ├── src/                 # Source code for React app
  │   ├── components/      # Reusable React components
  │   ├── pages/           # React components for different pages
  │   ├── App.js           # Main app component
  │   ├── index.js         # React entry point
  ├── package.json         # Frontend dependencies and scripts
  ├── Dockerfile           # Docker configuration for the frontend
  ├── docker-compose.yml   # Docker Compose configuration to run the frontend
```

## Running the Project Locally

Follow these steps to run the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Abhay189/Letter.git
   cd letter
   ```

2. **Navigate to the backend directory**:
   ```bash
   cd Backend
   ```

3. **Build and run the backend, database and Frontend containers**:
   ```bash
   docker-compose up --build
   ```

   This will start the Django backend server, MySQL server for database and React frontend application. 

5. **Create and migrate the database** (if not already done):
   ```bash
   docker-compose exec letter-backend python3 manage.py migrate
   ```

6. **Create a superuser to access the admin panel** (optional):
   ```bash
   docker-compose exec letter-backend python3 manage.py createsuperuser
   ```

7. Open your browser and navigate to the respective addresses to use the application:
   - **Frontend**: `http://localhost:3000`
   - **Backend** (Django Admin): `http://localhost:8000/admin`

---

## Running Tests

To run tests for the backend, use the following command:

```bash
docker-compose exec backend python manage.py test chat.tests.test
```

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---



