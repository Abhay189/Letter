import * as contact_details from '../api/requests/contactDetails';
import Column from './Column';
import ContactDetails from './ContactDetails';
import CurrentChatHeader from './CurrentChatHeader';

interface Props {
    contactDetailsById: contact_details.ContactDetailsById;
    selectedContactId: number;
    setselectedContactId: (selectedId: number) => (void);
}

function ViewContactDetailsScreen({contactDetailsById, selectedContactId, setselectedContactId}: Props){
    return <Column id="" className="chat-history-col flex-grow-1 flex-shrink-1" style={{}}>
        <CurrentChatHeader contactDetailsById={contactDetailsById} selectedChatContactId={selectedContactId}/>
        <ContactDetails contactDetailsById={contactDetailsById} selectedChatContactId={selectedContactId} setselectedContactId={setselectedContactId}/>
        <button type="button" className="remove-contact-btn btn btn-danger"> Remove Contact </button>
    </Column>
}

export default ViewContactDetailsScreen;