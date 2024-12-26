import * as personal_profile_details from '../api/requests/personalProfileDetails';

interface Props {
    personalProfileDetails: personal_profile_details.PersonalProfileDetails;
}

function ProfilePreviewPanel({personalProfileDetails}: Props) {
    return <>
        
        <nav className="subtopnav dropdown">
            <div className="btn profile-prev-panel rounded-0 flex-shrink-0 flex-grow-1 subtopnav-dropdown-btn subtopnav-item"> 
                    <img src={"img/grey-circle.png"} width="54" height="35"/>
                    {personalProfileDetails.firstName + " " + personalProfileDetails.lastName}   
            </div>
            <div className="subtopnav-dropdown-items">
                <a className="subtopnav-dropdown-item" href="./personal-profile"> View Profile </a>
                <br/>
                <a className="subtopnav-dropdown-item" href="./contacts"> View Contacts </a>
            </div>
        </nav> 
    </>
}

export default ProfilePreviewPanel;