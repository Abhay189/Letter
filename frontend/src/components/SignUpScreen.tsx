import Row from './Row';
import Column from './Column';
import React from 'react';
import axios from 'axios';

//api requests imports:
import * as personalProfileDetails from '../api/requests/personalProfileDetails';
import * as contactDetails from '../api/requests/contactDetails';

// Function to handle the signup button click


function SignUpScreen() {
    
//     const handleSignUp = async () => {
//     console.log("signup btn clicked");

//     // Collect form input values
//     const email = document.getElementById("email-text-input-sign-up") as HTMLInputElement;
//     const phone = document.getElementById("phone-num-text-input-sign-up") as HTMLInputElement;
//     const firstName = document.getElementById("first-name-text-input-sign-up") as HTMLInputElement;
//     const lastName = document.getElementById("last-name-text-input-sign-up") as HTMLInputElement;
//     const password = document.getElementById("password-text-input-sign-up") as HTMLInputElement;

//     // Prepare the payload
//     const payload = {
//         email,
//         phone,
//         firstName,
//         lastName,
//         password
//     };


//     try {
        
//         // Make the POST request
//         const response = await axios.post('http://127.0.0.1:8000/api/login', payload);
        
//         if (response.status === 200) {
//             // Redirect to chats page on success
//             // window.location.href = '/chats';
//             console.log("Post request succeeded");
//         } else {
//             // Handle non-200 responses
//             alert('Something went wrong. Please try again.');
//         }
//     } catch (error) {
//         console.error('Error signing up:', error);
//         alert('Signup failed. Please check your details and try again.');
//         }
//     };

    return <>
        <Row id="" className='sign-up-login-screen' style={{}}>
            <img src={"img/mailGraphic.png"} width="300" height="270" className="mailGraphic"/>
            <img src={"img/visualDivider.png"} width="50" height="500" className="visualDivider"/>
            <form className="gap-4" style={{display: 'flex', flexDirection: 'column'}}>
                <h5> Signup to send your first letter </h5>
                <input type="text" id="email-text-input-sign-up" className="text-input-sign-up-login" placeholder="email .."/>
                <input type="text" id="phone-num-text-input-sign-up" className="text-input-sign-up-login" placeholder="phone number .."/>
                <input type="text" id="first-name-text-input-sign-up" className="text-input-sign-up-login" placeholder="first name .."/>
                <input type="text" id="last-name-text-input-sign-up" className="text-input-sign-up-login" placeholder="last name .."/>
                <input type="text" id="password-text-input-sign-up" className="text-input-sign-up-login" placeholder="password .."/>
                <Row id="" className="justify-content-center" style={{}}>
                    <button type="button" className="btn btn-secondary submit-btn-sign-up-login" onClick={() => 
                    { 
                        console.log(contactDetails.getContactDetailsOfAllContacts("1"));
                        //console.log(personalProfileDetails.userLogin("blahblah@gmail.com", "1234567890", "0987654321")); 
                    }}> Signup </button> 
                </Row>
            </form>
        </Row>
        
    </>
}

export default SignUpScreen;