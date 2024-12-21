import ChatsList from '../components/ChatsList';
import ProfilePreviewPanel from '../components/ProfilePreviewPanel';

function ChatsListCol() {
    return <div className="d-grid gap-2">
        <ProfilePreviewPanel/>
        <ChatsList/>
    </div>
}

export default ChatsListCol;