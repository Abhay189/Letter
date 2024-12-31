import * as contact_details from '../api/requests/contactDetails';
import SetSelectedIndexFunc from './ChatsList';

//misc imports
import {viewContactsScreenSubscreenState} from './ViewContactsScreen';

interface Props {
    contactDetails: contact_details.ContactDetails;
    index: number;
    selectedIndex: number;
    setSelectedIndex: (selectedIndex: number) => (void);
    extraOnClickActions: Function;
}

function ChatPreviewPanel({contactDetails, index, selectedIndex, setSelectedIndex, extraOnClickActions}: Props) {
    //console.log(contactDetails.id);

    return <button
        type="button" 
        className={ selectedIndex === index ? "chat-preview-panel btn btn-light active" : "chat-preview-panel btn btn-light"} 
        key={contactDetails.id}
        onClick={() => 
            { setSelectedIndex(contactDetails.id); 
            extraOnClickActions(viewContactsScreenSubscreenState.SHOW_VIEW_CONTACT_DETAILS_SCREEN);
            } }
        > 
            <img src={"/img/grey-circle.png"} width="54" height="35"/>
            { contactDetails.name }  
    </button >
}

export default ChatPreviewPanel;