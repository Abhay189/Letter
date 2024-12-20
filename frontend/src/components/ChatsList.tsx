import * as ContactDetails from '../api/requests/ContactDetails';



function ChatsList() {
    const contactDetailsOfOpenChats = ContactDetails.getContactDetailsOfOpenChats();

    return <div className="list-group">
        {contactDetailsOfOpenChats.map((contactDetails) => (<button type="button" className=""> contactDetails.firstName </button>))}
    </div>
}

export default ChatsList;