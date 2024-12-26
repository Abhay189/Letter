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

//misc imports
//import viewContactsScreenSubscreenState from '../exportedObjs/viewContactsScreen';

export const viewContactsScreenSubscreenState = {
    SHOW_VIEW_CONTACT_DETAILS_SCREEN: 0,
    SHOW_ADD_CONTACT_SCREEN: 1
} 

export function ViewContactsScreen() {
    const [[contactDetailsOfAllContacts, contactDetailsById], setContactDetailsListAndById] = useState(contact_details.getContactDetailsOfAllContacts());
    const [selectedContactId, setselectedContactId] = useState(0);
    let [whichSubScreenShowing, setWhichSubScreenShowing] = useState(viewContactsScreenSubscreenState.SHOW_VIEW_CONTACT_DETAILS_SCREEN);

    const getSubScreen = () => {
        return whichSubScreenShowing === viewContactsScreenSubscreenState.SHOW_VIEW_CONTACT_DETAILS_SCREEN
        ? 
        <ViewContactDetailsScreen contactDetailsById={contactDetailsById} selectedContactId={selectedContactId} setselectedContactId={setselectedContactId} setContactDetailsListAndById={setContactDetailsListAndById}/> 
        : 
        <AddContactScreen/>;
    }

    return <Fragment>
        <Row id="" className="chat-screen-row" style={{}}>
            <Column id="" className="chats-and-profile-col d-grid flex-shrink-0 align-self-start" style={{}}>
                <button className="go-back-to-chat-screen-btn btn btn-secondary"> Back to Chats </button>
                <div>
                    <p className="all-contacts-label">All Contacts</p>
                </div>
                <ChatsList className="all-contacts-list" contactDetailsOfOpenChats={contactDetailsOfAllContacts} selectedIndex={selectedContactId} setSelectedIndex={setselectedContactId} extraOnClickActions={setWhichSubScreenShowing}/>
                <button className="go-to-add-contact-screen-btn btn btn-secondary" onClick={() => {setWhichSubScreenShowing(viewContactsScreenSubscreenState.SHOW_ADD_CONTACT_SCREEN);} }> Add Contact </button>
            </Column>  
            {getSubScreen()}
        </Row>   
    </Fragment>
  
  }  