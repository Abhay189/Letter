//external imports:
import { Fragment, useState } from 'react';

//api requests imports:
import * as personal_profile_details from '../api/requests/personalProfileDetails';

//components imports:

function PersonalProfileScreen() {
    const [personalProfileDetails, setPersonalProfileDetails] = useState(personal_profile_details.getPersonalProfileDetails());

    return <Fragment>
        <label htmlFor="team">First Name</label>
        <select name="team" id="team"/>
        <br/>

    </Fragment>
}

export default PersonalProfileScreen;