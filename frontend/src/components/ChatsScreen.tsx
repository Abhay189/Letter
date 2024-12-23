//external imports:
import { useState } from 'react';
import { Fragment } from 'react';

//api requests imports:
import * as contact_details from '../api/requests/contactDetails';
import * as personal_profile_details from '../api/requests/personalProfileDetails';

//components imports:
import ChatsList from '../components/ChatsList';
import ProfilePreviewPanel from '../components/ProfilePreviewPanel';
import CurrentChatHeader from './CurrentChatHeader';
import Row from './Row';
import Column from './Column';
import ChatHistory from './ChatHistory';

function ChatsScreen() {
    const [[contactDetailsOfAllContacts, contactDetailsById], _] = useState(contact_details.getContactDetailsOfAllContacts());
    const [contactDetailsOfOpenChats, setContactDetailsOfOpenChats] = useState(contact_details.getContactDetailsOfOpenChats(contactDetailsOfAllContacts));
    const [selectedChatContactId, setSelectedChatContactId] = useState(0);
    const [personalProfileDetails, setPersonalProfileDetails] = useState(personal_profile_details.getPersonalProfileDetails());

    return <Fragment>
        <Row id="" className="chat-screen-row flex-grow-1" style={{}}>
            <Column id="" className="chats-and-profile-col d-grid flex-shrink-0 align-self-start" style={{}}>
                <ProfilePreviewPanel personalProfileDetails={personalProfileDetails}/>
                <ChatsList contactDetailsOfOpenChats={contactDetailsOfOpenChats} selectedIndex={selectedChatContactId} setSelectedIndex={setSelectedChatContactId}/>
            </Column>  
            <Column id="" className="chat-history-col flex-grow-1" style={{}}>
                <CurrentChatHeader contactDetailsById={contactDetailsById} selectedChatContactId={selectedChatContactId}/>
                <ChatHistory/>
                <input type="text" className="chat-text-input"/> 
            </Column>
        </Row>   
    </Fragment>
  
  }
  
  export default ChatsScreen;
  