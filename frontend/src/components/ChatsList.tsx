//external imports:
import { useState } from 'react';

//internal imports:
import * as contactDetails from '../api/requests/contactDetails';

//components imports:
import ChatPreviewPanel from './ChatPreviewPanel';


interface Props {
    contactDetailsOfOpenChats: contactDetails.ContactDetails[];
    selectedIndex: number;
    setSelectedIndex: (selectedIndex: number) => (void);
}

function ChatsList({contactDetailsOfOpenChats, selectedIndex, setSelectedIndex}: Props) {
    //console.log(contactDetailsOfOpenChats[0].id);
    //console.log(contactDetailsOfOpenChats[1].id);
    return <div className="chats-list list-group gap-1 flex-grow-1 align-self-start">
        {contactDetailsOfOpenChats.map((contact_details, index) => (<ChatPreviewPanel contactDetails={contact_details} index={index} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />))}
    </div>
}

export default ChatsList;