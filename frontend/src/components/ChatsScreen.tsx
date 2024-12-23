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

function ChatsScreen() {
    const [[contactDetailsOfAllContacts, contactDetailsById], _] = useState(contact_details.getContactDetailsOfAllContacts());
    const [contactDetailsOfOpenChats, setContactDetailsOfOpenChats] = useState(contact_details.getContactDetailsOfOpenChats(contactDetailsOfAllContacts));
    const [selectedChatContactId, setSelectedChatContactId] = useState(0);
    const [personalProfileDetails, setPersonalProfileDetails] = useState(personal_profile_details.getPersonalProfileDetails());

    return <Fragment>
        <Row id="chatScreenRow" className="" style={{}}>
            <Column id="chatsAndProfileCol" className="d-grid gap-2" style={{}}>
                <ProfilePreviewPanel personalProfileDetails={personalProfileDetails}/>
                <ChatsList contactDetailsOfOpenChats={contactDetailsOfOpenChats} selectedIndex={selectedChatContactId} setSelectedIndex={setSelectedChatContactId}/>
            </Column>  
            <Column id="chatHistoryCol" className="" style={{}}>
                <CurrentChatHeader contactDetailsById={contactDetailsById} selectedChatContactId={selectedChatContactId}/>
                
                <input type="text"/> 
            </Column>
        </Row>   
    </Fragment>
  
  }
  
  export default ChatsScreen;
  