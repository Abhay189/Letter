import * as contactDetails from '../api/requests/contactDetails';

interface Props {
    contactDetails: contactDetails.ContactDetails;
}

function ChatPreviewPanel({contactDetails}: Props) {
    return <button type="button" className="btn btn-light"> {contactDetails.firstName + " " + contactDetails.lastName} </button>
}

export default ChatPreviewPanel;