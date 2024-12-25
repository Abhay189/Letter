import Column from './Column';

function AddContactsScreen() {
    return <Column id="" className="chat-history-col flex-grow-1 flex-shrink-1" style={{}}>
        <input type="text" id="name-text-input-add-contact" className="text-input-sign-up-login" placeholder="contact name .."/>
        <input type="text" id="phone-num-text-input-add-contact" className="text-input-sign-up-login" placeholder="phone number .."/>
        <button type="button" className="confirm-add-contact-btn btn btn-success"> Add Contact </button>
    </Column>
}

export default AddContactsScreen;