import * as contact_details from '../api/requests/contactDetails';
import SetSelectedIndexFunc from './ChatsList';

interface Props {
    contactDetails: contact_details.ContactDetails;
    index: number;
    selectedIndex: number;
    setSelectedIndex: (selectedIndex: number) => (void);
}

function ChatPreviewPanel({contactDetails, index, selectedIndex, setSelectedIndex}: Props) {
    //console.log(contactDetails.id);

    return <button
        type="button" 
        className={ selectedIndex === index ? "chat-preview-panel btn btn-light active" : "chat-preview-panel btn btn-light"} 
        key={contactDetails.id}
        onClick={() => { setSelectedIndex(contactDetails.id); } }
        > 
            <img src={"img/grey-circle.png"} width="54" height="35"/>
            { contactDetails.name }  
    </button >
}

export default ChatPreviewPanel;