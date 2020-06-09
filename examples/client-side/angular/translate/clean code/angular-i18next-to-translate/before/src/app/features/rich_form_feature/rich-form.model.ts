export class Contact {
    lastName: string;
    firstName: string;
    middleName: string;
}

export class RichFormModel {
    email: string;
    count: Number = 0;
    technicalContact: Contact = new Contact();
} 