//external imports:
import { useState } from 'react';

//internal imports:
import * as contactDetails from '../api/requests/contactDetails';

//components imports:
import ChatPreviewPanel from './ChatPreviewPanel';


interface Props {
    contactDetailsOfAllContacts: contactDetails.ContactDetails[];
    selectedIndex: number;
    setSelectedIndex: (selectedIndex: number) => (void);
}

function ContactsList({contactDetailsOfAllContacts, selectedIndex, setSelectedIndex}: Props) {
    //console.log(contactDetailsOfAllContacts[0].id);
    //console.log(contactDetailsOfAllContacts[1].id);
    return <div className="chats-list list-group gap-1 flex-grow-1 align-self-start">
        {contactDetailsOfAllContacts.map((contact_details, index) => (<ChatPreviewPanel contactDetails={contact_details} index={index} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />))}
    </div>
}

export default ContactsList;