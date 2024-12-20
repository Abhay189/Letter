import * as ContactDetails from '../api/requests/ContactDetails';



function ChatsList() {
    return <div className="list-group">

        <button type="button" className="chat-contacts-menu-item">{ContactDetails.getContactDetails().firstName}</button>
        <button type="button" className="chat-contacts-menu-item">A third button item</button>
        <button type="button" className="chat-contacts-menu-item">A fourth button item</button>
    </div>
}

export default ChatsList