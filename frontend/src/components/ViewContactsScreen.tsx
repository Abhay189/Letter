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
import ContactDetails from './ContactDetails';

function ViewContactsScreen() {
    const [[contactDetailsOfAllContacts, contactDetailsById], _] = useState(contact_details.getContactDetailsOfAllContacts());
    const [selectedContactId, setselectedContactId] = useState(0);
    const [personalProfileDetails, setPersonalProfileDetails] = useState(personal_profile_details.getPersonalProfileDetails());

    return <Fragment>
        <Row id="" className="chat-screen-row" style={{}}>
            <Column id="" className="chats-and-profile-col d-grid flex-shrink-0 align-self-start" style={{}}>
                <ProfilePreviewPanel personalProfileDetails={personalProfileDetails}/>
                <ChatsList contactDetailsOfOpenChats={contactDetailsOfAllContacts} selectedIndex={selectedContactId} setSelectedIndex={setselectedContactId}/>
            </Column>  
            <Column id="" className="chat-history-col flex-grow-1 flex-shrink-1" style={{}}>
                <CurrentChatHeader contactDetailsById={contactDetailsById} selectedChatContactId={selectedContactId}/>
                <ContactDetails contactDetailsById={contactDetailsById} selectedChatContactId={selectedContactId} setselectedContactId={setselectedContactId}/>
                <button type="button" className="remove-contact-btn btn btn-danger"> Remove Contact </button>
            </Column>
        </Row>   
    </Fragment>
  
  }
  
  export default ViewContactsScreen;
  