export interface ContactDetails {
    firstName: string;
    lastName: string;
}

export function getContactDetails(){
    //will make http request using axios to get contact details, values will be hardcoded for now
    const contactDetails: ContactDetails = {
        firstName: "John",
        lastName: "Doe",
    };
    return contactDetails;
}

export function getContactDetailsOfOpenChats(): ContactDetails[] {
    //will make http request using axios to get contact details, values will be hardcoded for now
    const contactDetailsOfOpenChats: ContactDetails[] = [getContactDetails(), getContactDetails()]
    return contactDetailsOfOpenChats;
}

 