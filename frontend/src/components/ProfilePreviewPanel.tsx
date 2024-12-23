import * as personal_profile_details from '../api/requests/personalProfileDetails';

interface Props {
    personalProfileDetails: personal_profile_details.PersonalProfileDetails;
}

function ProfilePreviewPanel({personalProfileDetails}: Props) {
    return <button 
        type="button" 
        className="btn profile-prev-panel rounded-0 flex-shrink-0 flex-grow-0"> 
            <img src={"img/grey-circle.png"} width="54" height="35"/>
            {personalProfileDetails.firstName + " " + personalProfileDetails.lastName}   
    </button>
}

export default ProfilePreviewPanel;