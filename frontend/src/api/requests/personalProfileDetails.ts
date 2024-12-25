export interface PersonalProfileDetails {
    firstName: string;
    lastName: string;
    phoneNum: string;
    email: string;
    password: string;
}

export interface PersonalProfileCredentials {
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

export function userSignUp(firstName: string, lastName: string, phoneNum: string, email: string, password: string): boolean {
    //will make http request using axios to get contact details, values will be hardcoded for now
        // console.log(firstName);
        // console.log(lastName);
        // console.log(phoneNum);
        // console.log(email);
        // console.log(password);
        
    //make http post request to send personalProfileCredentials to server and see if they are valid
    const userSignUpWasSuccessful = true;
    return userSignUpWasSuccessful;
}

export function userLogin(): boolean {
    //will make http request using axios to get contact details, values will be hardcoded for now
    //returns whether the user loging attempt was successfull or not
    const personalProfileCredentials: PersonalProfileCredentials = {
        phoneNum: "999-999-9999",
        email:"whyamiupatthreeinthemorningcodingthis@gmail.com",
        password:"1234icantthinkofanything"
    };
    //make http post request to send personalProfileCredentials to server and see if they are correct
    const userLoginWasSuccessful = true;
    return userLoginWasSuccessful;
}