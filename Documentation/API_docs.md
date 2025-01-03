# Messaging Application API Documentation

## Frontend Page Setup

- **Login Page**
- **Signup Page**
- **Profile Page** (Only to get the personal profile of the user)
- **Chat Page**
  - Contact List Attachment
  - Conversation List Attachment
  - Edit/Create Conversation Dialogue Box (for creating new conversations and editing current ones)

---

## Authentication

| **Endpoint** | **Method** | **Description**              | **Input**                              | **Output**                          |
|--------------|------------|------------------------------|----------------------------------------|--------------------------------------|
| `/login`     | POST       | API endpoint for user login. | `email`, `password`                    | Success: `200 OK` with user token.  |
| `/register`  | POST       | API endpoint for user registration. | `first_name`, `last_name`, `email`, `password`, `phone_num` | Success: `201 Created`.             |

---

## User Profile

| **Endpoint** | **Method** | **Description**                   | **Input**         | **Output**               |
|--------------|------------|-----------------------------------|-------------------|--------------------------|
| `/profile`   | GET        | Retrieve the current user's profile. | Query Parameter: `user_id` (required)  | User profile data (`200 OK`). |
| `/profile`   | PUT        | Update the current user's profile. | `user_id` (required), Fields to update (`first_name`, `last_name`, `phone_num`, etc.) | Success: `200 OK`.        |

---

## Contacts

| **Endpoint**            | **Method** | **Description**                           | **Input**               | **Output**               |
|--------------------------|------------|-------------------------------------------|-------------------------|--------------------------|
| `/contacts`             | GET        | Get a list of all the user's contacts.    | `user_id`                    | List of contacts (`200 OK`). |
| `/contacts`             | POST       | Add a new contact to the user's list.     | `user_id`, `contact_name`, `phone_num` | Success: `201 Created`. |
| `/contacts/<contact_id>`| PUT        | Update details of a specific contact.     | Fields to update.       | Success: `200 OK`.       |
| `/contacts/<contact_id>`| DELETE     | Delete a specific contact.                | `user_id`, `contact_id`   | Success: `204 No Content`. |

---

## Conversations

| **Endpoint**                    | **Method** | **Description**                          | **Input**                      | **Output**               |
|----------------------------------|------------|------------------------------------------|--------------------------------|--------------------------|
| `/conversations`                | GET        | Get a list of conversations (paginated). | `page`, `size` (optional).     | List of conversations (`200 OK`). |
| `/conversations`                | POST       | Create a new conversation.               | `conversation_name`, `participants` | Success: `201 Created`. |
| `/conversations/<conversation_id>` | PUT     | Update the details of a specific conversation. | Fields to update.              | Success: `200 OK`.       |
| `/conversations/<conversation_id>` | DELETE  | Delete a specific conversation.          | None                           | Success: `204 No Content`. |

---

## Messages

| **Endpoint**              | **Method** | **Description**                          | **Input**                              | **Output**               |
|----------------------------|------------|------------------------------------------|----------------------------------------|--------------------------|
| `/messages`               | GET        | Get messages in a conversation (paginated). | `conversation_id`, `page`, `size` (optional). | List of messages (`200 OK`). |
| `/messages`               | POST       | Add a new message to a conversation.     | `conversation_id`, `message_content`.  | Success: `201 Created`.  |
| `/messages/<message_id>`  | PUT        | Update a specific message.               | Fields to update.                      | Success: `200 OK`.       |
| `/messages/<message_id>`  | DELETE     | Delete a specific message.               | None                                   | Success: `204 No Content`. |

---

## Notes

### Pagination Parameters (for GET requests)
- **`page`**: The page number to retrieve (default: 1).
- **`size`**: Number of items per page (default: 50).

### HTTP Status Codes
- `200 OK`: Successful request.
- `201 Created`: Resource successfully created.
- `204 No Content`: Successful deletion.
- `400 Bad Request`: Invalid input parameters.
- `401 Unauthorized`: Authentication failure.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Internal server error.
