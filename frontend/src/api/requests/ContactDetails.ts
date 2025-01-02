

import { _get, _post, _put, _delete } from '../apiClient';

export interface ServerApiContactDetails {
    contact_name: string;
    contact_id: number;
}

export interface ContactDetails {
    name: string;
    id: number;
}

export interface ContactDetailsById {
    [id: number]: ContactDetails;
}



// Function to sign up a new user
export async function signUpUser(firstName: string, lastName: string, phoneNum: string, email: string, password: string) {
    const response = await _post('/api/signup', {
        first_name: firstName,
        last_name: lastName,
        phone_num: phoneNum,
        email,
        password,
    });
    return response.data; // Store the received data
}



// Function to add a new contact
export async function addContact(userId: string, contactName: string, contactPhoneNum: string) {
    const response = await _post('/api/contacts', {
        id: userId,
        contact_name: contactName,
        contact_phone_num: contactPhoneNum,
    });
    return response.data; // Store the received data
}

// Function to delete a contact
export async function deleteContact(userId: string, contactPhoneNum: string) {
    const response = await _delete('/api/contacts', {
        data: {
            id: userId,
            contact_phone_num: contactPhoneNum,
        },
    });
    return response.data; // Store the received data
}



function convertServerApiContactDetailsFieldNames(serverApiContactDetails: ServerApiContactDetails): ContactDetails {
    return {
      name: serverApiContactDetails.contact_name,
      id: serverApiContactDetails.contact_id,
    };
  }

function addAllContactsToDic(contactDetailsList: ContactDetails[]){
    const contactDetailsById: ContactDetailsById = {};
    for (const contact of contactDetailsList){
        contactDetailsById[contact.id] = contact;
    }
    return contactDetailsById;
}

// Function to get all contacts for a user
export async function getContactDetailsOfAllContacts(userId: string): Promise<[ContactDetails[], ContactDetailsById]> {
    var request = require('request');
    var options = {
        'method': 'GET',
        'url': 'http://127.0.0.1:8000/api/contacts',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": "1"
        })
    
    };
   
      
    
    const response = await _get('/api/contacts', {
        data: JSON.stringify({ "id": "1" }) // Pass user ID as a parameter
    });
    const contactDetailsList = response.data.map(convertServerApiContactDetailsFieldNames); // Store the received data
    const contactDetailsById = addAllContactsToDic(contactDetailsList);
    return [contactDetailsList, contactDetailsById] ;
}
// This func is the same as the one above by the same name but it is for development purposes only as it return hard-coded values rather than returning the requested data from the server
// export function getContactDetailsOfAllContacts(): [ContactDetails[], ContactDetailsById] {
//     //will make http request using axios to get contact details, values will be hardcoded for now
//     const contactDetailsList: ContactDetails[] = [
//         {
//         name: "John Doe",
//         id: 0
//         },
//         {
//         name: "Mary Jane",
//         id: 1
//         },
//         {
//         name: "Mary Jane",
//         id: 2
//         },
//         {
//         name: "Mary Jane",
//         id: 3
//         },
//         {
//         name: "Mary Jane",
//         id: 4
//         },
//         {
//         name: "Mary Jane",
//         id: 5
//         },
//         {
//         name: "Mary Jane",
//         id: 6
//         },
//         {
//         name: "Mary Jane",
//         id: 7
//         },
//         {
//         name: "Mary Jane",
//         id: 8
//         },
//         {
//         name: "Mary Jane",
//         id: 9
//         },
//         {
//         name: "Mary Jane",
//         id: 10
//         },
//         {
//         name: "Mary Jane",
//         id: 11
//         },
//         {
//         name: "Mary Jane",
//         id: 12
//         },
//         {
//         name: "Mary Jane",
//         id: 13
//         }
//     ];

//     const contactDetailsById: ContactDetailsById = {
//         0: contactDetailsList[0],
//         1: contactDetailsList[1],
//         2: contactDetailsList[2],
//         3: contactDetailsList[3],
//         4: contactDetailsList[4],
//         5: contactDetailsList[5],
//         6: contactDetailsList[6],
//         7: contactDetailsList[7],
//         8: contactDetailsList[8],
//         9: contactDetailsList[9],
//         10: contactDetailsList[10],
//         11: contactDetailsList[11],
//         12: contactDetailsList[12],
//         13: contactDetailsList[13],
//     };

//     return [contactDetailsList, contactDetailsById] ;
// }

export function getContactDetailsOfOpenChats(allContacts: ContactDetails[]): ContactDetails[] {
    //will make http request using axios to get contact details, values will be hardcoded for now
    const contactDetailsOfOpenChats: ContactDetails[] = allContacts; //TODO: this line should go through all contacts list and make a new list of only the ones with open chats. It also should be sorted from most recent conversation to least recent conversation.
    return contactDetailsOfOpenChats;
}


 