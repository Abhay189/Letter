import Column from './Column';

function AddContactsScreen() {
    return <Column id="" className="chat-history-col flex-grow-1 flex-shrink-1" style={{}}>
        <p className="add-contact-header"> Add Contact </p>
        <input type="text" id="" className="text-input-sign-up-login name-text-input-add-contact" placeholder="contact name .."/>
        <input type="text" id="" className="text-input-sign-up-login phone-num-text-input-add-contact" placeholder="phone number .."/>
        <br/>
        <button type="button" className="confirm-add-contact-btn btn btn-success"> Add Contact </button>
    </Column>
}

export default AddContactsScreen;