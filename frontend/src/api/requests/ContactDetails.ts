export interface ContactDetails {
    name: string;
    id: number;
}

export interface ContactDetailsById {
    [id: number]: ContactDetails;
}


export function getContactDetailsOfAllContacts(): [ContactDetails[], ContactDetailsById] {
    //will make http request using axios to get contact details, values will be hardcoded for now
    const contactDetailsList: ContactDetails[] = [
        {
        name: "John Doe",
        id: 0
        },
        {
        name: "Mary Jane",
        id: 1
        },
        {
        name: "Mary Jane",
        id: 2
        },
        {
        name: "Mary Jane",
        id: 3
        },
        {
        name: "Mary Jane",
        id: 4
        },
        {
        name: "Mary Jane",
        id: 5
        },
        {
        name: "Mary Jane",
        id: 6
        },
        {
        name: "Mary Jane",
        id: 7
        },
        {
        name: "Mary Jane",
        id: 8
        },
        {
        name: "Mary Jane",
        id: 9
        },
        {
        name: "Mary Jane",
        id: 10
        },
        {
        name: "Mary Jane",
        id: 11
        },
        {
        name: "Mary Jane",
        id: 12
        },
        {
        name: "Mary Jane",
        id: 13
        }
    ];

    const contactDetailsById: ContactDetailsById = {
        0: contactDetailsList[0],
        1: contactDetailsList[1],
        2: contactDetailsList[2],
        3: contactDetailsList[3],
        4: contactDetailsList[4],
        5: contactDetailsList[5],
        6: contactDetailsList[6],
        7: contactDetailsList[7],
        8: contactDetailsList[8],
        9: contactDetailsList[9],
        10: contactDetailsList[10],
        11: contactDetailsList[11],
        12: contactDetailsList[12],
        13: contactDetailsList[13],
    };

    return [contactDetailsList, contactDetailsById] ;
}

export function getContactDetailsOfOpenChats(allContacts: ContactDetails[]): ContactDetails[] {
    //will make http request using axios to get contact details, values will be hardcoded for now
    const contactDetailsOfOpenChats: ContactDetails[] = allContacts; //TODO: this line should go through all contacts list and make a new list of only the ones with open chats. It also should be sorted from most recent conversation to least recent conversation.
    return contactDetailsOfOpenChats;
}


 