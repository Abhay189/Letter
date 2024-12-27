import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

function App() {
  return <RouterProvider router={router} />
  //return <ChatsScreen/>
  //return <SignUpScreen/>
  //return <LoginScreen/>
  //return <ViewContactsScreen/>
}

export default App;
