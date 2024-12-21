//external imports:
import { useState } from 'react';

//internal imports:
import * as contactDetails from '../api/requests/contactDetails';

//components imports:
import ChatPreviewPanel from './ChatPreviewPanel';


function ChatsList() {
    const contactDetailsOfOpenChats = contactDetails.getContactDetailsOfOpenChats();
    const [selectedIndex, setSelectedIndex] = useState(-1);

    return <div className="list-group">
        {contactDetailsOfOpenChats.map((contact_details, index) => (<ChatPreviewPanel contactDetails={contact_details} index={index} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />))}
    </div>
}

export default ChatsList;