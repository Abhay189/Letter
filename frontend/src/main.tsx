import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App'
import './App.css'
import Homepage from './components/Homepage';
import ChatsScreen from './components/ChatsScreen';
import SignUpScreen from './components/SignUpScreen';
import LoginScreen from './components/LoginScreen';
import {ViewContactsScreen} from './components/ViewContactsScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />
  },
  {
    path: '/login',
    element: <LoginScreen />
  },
  {
    path: '/sign-up',
    element: <SignUpScreen />
  },
  {
    path: '/chats',
    element: <ChatsScreen />
  },
  {
    path: '/contacts',
    element: <ViewContactsScreen />
  },
  {
    path: '/contacts/:initSelectedContactId',
    element: <ViewContactsScreen />
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
