export interface PersonalProfileDetails {
    firstName: string;
    lastName: string;
}

export function getPersonalProfileDetails(){
    //will make http request using axios to get contact details, values will be hardcoded for now
    const personalProfileDetails: PersonalProfileDetails = {
        firstName: "Justin",
        lastName: "Yee",
    };
    return personalProfileDetails;
}