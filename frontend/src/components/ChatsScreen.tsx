//external imports:
import { useState, useEffect } from 'react';
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
    const [contactDetailsOfAllContacts, setContactDetailsOfAllContacts] = useState<contact_details.ContactDetails[]>([])/*useState(contact_details.getContactDetailsOfAllContacts("1")*/; //TODO currently supplies user id of "1" as input always but this should be changed in the future to supply userid of current user 
    const [contactDetailsById, setContactDetailsById] = useState<contact_details.ContactDetailsById>({});
    const [contactDetailsOfOpenChats, setContactDetailsOfOpenChats] = useState(contact_details.getContactDetailsOfOpenChats(contactDetailsOfAllContacts));
    const [selectedChatContactId, setSelectedChatContactId] = useState(0);
    const [personalProfileDetails, setPersonalProfileDetails] = useState(personal_profile_details.getPersonalProfileDetails());

    useEffect(() => {
        async function fetchData() {
        const [list, byId] = await contact_details.getContactDetailsOfAllContacts("1");
        setContactDetailsOfAllContacts(list);
        setContactDetailsById(byId);
        }
        fetchData();
    }, []);

    return <Fragment>
        <Row id="" className="chat-screen-row" style={{}}>
            <Column id="" className="chats-and-profile-col d-grid flex-shrink-0 align-self-start" style={{}}>
                <ProfilePreviewPanel personalProfileDetails={personalProfileDetails}/>
                <ChatsList className="" contactDetailsOfOpenChats={contactDetailsOfOpenChats} selectedIndex={selectedChatContactId} setSelectedIndex={setSelectedChatContactId} extraOnClickActions={() => {}}/>
            </Column>  
            <Column id="" className="chat-history-col flex-grow-1 flex-shrink-1" style={{}}>
                <CurrentChatHeader contactDetailsById={contactDetailsById} selectedChatContactId={selectedChatContactId}/>
                <ChatHistory/>
                <input type="text" className="chat-text-input" placeholder="Type a message"/> 
            </Column>
        </Row>   
    </Fragment>
  
  }
  
  export default ChatsScreen;
  