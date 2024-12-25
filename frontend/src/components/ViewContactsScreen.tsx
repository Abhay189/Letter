//external imports:
import { useState } from 'react';
import { Fragment } from 'react';

//api requests imports:
import * as contact_details from '../api/requests/contactDetails';
import * as personal_profile_details from '../api/requests/personalProfileDetails';

//components imports:
import ChatsList from '../components/ChatsList';
import ProfilePreviewPanel from '../components/ProfilePreviewPanel';
import Row from './Row';
import Column from './Column';
import ViewContactDetailsScreen from './ViewContactDetailsScreen';
import AddContactScreen from './AddContactScreen';

function ViewContactsScreen() {
    const [[contactDetailsOfAllContacts, contactDetailsById], setContactDetailsListAndById] = useState(contact_details.getContactDetailsOfAllContacts());
    const [selectedContactId, setselectedContactId] = useState(0);

    return <Fragment>
        <Row id="" className="chat-screen-row" style={{}}>
            <Column id="" className="chats-and-profile-col d-grid flex-shrink-0 align-self-start" style={{}}>
                <button className="go-back-to-chat-screen-btn btn btn-secondary"> Back to Chats </button>
                <div>
                    <p className="all-contacts-label">All Contacts</p>
                </div>
                <ChatsList className="all-contacts-list" contactDetailsOfOpenChats={contactDetailsOfAllContacts} selectedIndex={selectedContactId} setSelectedIndex={setselectedContactId}/>
                <button className="go-to-add-contact-screen-btn btn btn-secondary"> Add Contact </button>
            </Column>  
            <ViewContactDetailsScreen contactDetailsById={contactDetailsById} selectedContactId={selectedContactId} setselectedContactId={setselectedContactId} setContactDetailsListAndById={setContactDetailsListAndById}/>
            <AddContactScreen/>

        </Row>   
    </Fragment>
  
  }
  
  export default ViewContactsScreen;
  