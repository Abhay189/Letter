import * as personalProfileDetails from '../api/requests/personalProfileDetails';

function ProfilePreviewPanel() {
    return <button type="button" className="btn btn-profile-prev"> {personalProfileDetails.getPersonalProfileDetails().firstName + " " + personalProfileDetails.getPersonalProfileDetails().lastName} </button>
}

export default ProfilePreviewPanel;