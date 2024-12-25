import * as contact_details from '../api/requests/contactDetails';

interface Props {
    contactDetailsById: contact_details.ContactDetailsById;
    selectedChatContactId: number;
    setselectedContactId: (selectedId: number) => (void);
}
function ContactDetails({ contactDetailsById, selectedChatContactId, setselectedContactId }: Props) {
    return <div className="contact-details flex-grow-1 flex-shrink-1">
       <label> First and Last Name: </label>
       <br/>
       <b> {contactDetailsById[selectedChatContactId].name} </b>
       <br/>

       <label> Phone Number: </label>
       <br/>
       <b> PLACEHOLDER </b>
    </div>
}

export default ContactDetails;