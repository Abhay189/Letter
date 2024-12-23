import * as personal_profile_details from '../api/requests/personalProfileDetails';

interface Props {
    personalProfileDetails: personal_profile_details.PersonalProfileDetails;
}

function ProfilePreviewPanel({personalProfileDetails}: Props) {
    return <button 
        type="button" 
        className="btn btn-profile-prev"> 
            {personalProfileDetails.firstName + " " + personalProfileDetails.lastName}   
    </button>
}

export default ProfilePreviewPanel;