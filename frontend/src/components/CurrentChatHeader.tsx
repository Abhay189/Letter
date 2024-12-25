import * as contact_details from '../api/requests/contactDetails';

interface Props {
    contactDetailsById: contact_details.ContactDetailsById;
    selectedChatContactId: number;
}

function CurrentChatHeader({ contactDetailsById, selectedChatContactId }: Props) {
    return <button 
        type="button" 
        className="btn btn-light rounded-0 flex-grow-0 flex-shrink-0">
            <img src={"img/grey-circle.png"} width="54" height="35"/>
            {contactDetailsById[selectedChatContactId].name} 
    </button>
}

export default CurrentChatHeader;