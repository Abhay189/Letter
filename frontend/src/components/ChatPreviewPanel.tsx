import * as contactDetails from '../api/requests/contactDetails';
import SetSelectedIndexFunc from './ChatsList';

interface Props {
    contactDetails: contactDetails.ContactDetails;
    index: number;
    selectedIndex: number;
    setSelectedIndex: (selectedIndex: number) => (void);
}

function ChatPreviewPanel({ contactDetails, index, selectedIndex, setSelectedIndex}: Props) {
    

    return <button
        type="button" 
        //name="chats-list"
        className={ selectedIndex === index ? "btn btn-light active" : "btn btn-light"} 
        key={contactDetails.firstName + " " + contactDetails.lastName}
        onClick={() => { setSelectedIndex(index); } }
        > 
            { contactDetails.firstName + " " + contactDetails.lastName }  
    </button >
}

export default ChatPreviewPanel;