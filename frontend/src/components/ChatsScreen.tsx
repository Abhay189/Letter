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

function ChatsScreen() {
    const [[contactDetailsOfAllContacts, contactDetailsById], _] = useState(contact_details.getContactDetailsOfAllContacts());
    const [contactDetailsOfOpenChats, setContactDetailsOfOpenChats] = useState(contact_details.getContactDetailsOfOpenChats(contactDetailsOfAllContacts));
    const [selectedChatContactId, setSelectedChatContactId] = useState(0);
    const [personalProfileDetails, setPersonalProfileDetails] = useState(personal_profile_details.getPersonalProfileDetails());

    return <Fragment key={8}>
        <div id="chatsAndProfileCol" className="d-grid gap-2">
            <ProfilePreviewPanel personalProfileDetails={personalProfileDetails}/>
            <ChatsList contactDetailsOfOpenChats={contactDetailsOfOpenChats} selectedIndex={selectedChatContactId} setSelectedIndex={setSelectedChatContactId}/>
        </div>  
        <CurrentChatHeader contactDetailsById={contactDetailsById} selectedChatContactId={selectedChatContactId}/>
    </Fragment>
  
  }
  
  export default ChatsScreen;
  