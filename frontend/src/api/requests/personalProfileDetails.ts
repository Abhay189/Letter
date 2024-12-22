export interface PersonalProfileDetails {
    firstName: string;
    lastName: string;
    phoneNum: string;
    email: string;
    password: string;
}

export function getPersonalProfileDetails(): PersonalProfileDetails {
    //will make http request using axios to get contact details, values will be hardcoded for now
    const personalProfileDetails: PersonalProfileDetails = {
        firstName: "Justin",
        lastName: "Yee",
        phoneNum: "999-999-9999",
        email:"whyamiupatthreeinthemorningcodingthis@gmail.com",
        password:"1234icantthinkofanything"
    };
    return personalProfileDetails;
}