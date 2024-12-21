//regular imports:
import * as contactDetails from '../api/requests/contactDetails';

//components imports:
import ChatPreviewPanel from './ChatPreviewPanel';


function ChatsList() {
    const contactDetailsOfOpenChats = contactDetails.getContactDetailsOfOpenChats();

    return <div className="list-group">
        {contactDetailsOfOpenChats.map((contact_details) => (<ChatPreviewPanel contactDetails={contact_details}/>))}
    </div>
}

export default ChatsList;