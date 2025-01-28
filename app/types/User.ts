export class User {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.phoneNumber = data.phone_number;
    }
}
