import * as contact_details from '../api/requests/contactDetails';

interface Props {
    contactDetailsById: contact_details.ContactDetailsById;
    selectedChatContactId: number;
}

function CurrentChatHeader({ contactDetailsById, selectedChatContactId }: Props) {
    return <button 
        type="button" 
        className="btn btn-light rounded-0">
            
            {contactDetailsById[selectedChatContactId].name} 
    </button>
}

export default CurrentChatHeader;