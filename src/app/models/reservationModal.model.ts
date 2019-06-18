export class ReservationObj {
    model: string;
    urlID: string;
    name: string;
    email: string;
    from: string;
    to: string;
    bookingstatus:boolean;
    constructor() {
        this.model = '';
        this.urlID = '';
        this.name = '';
        this.email = '';
        this.from = '';
        this.to = '';
        this.bookingstatus = false;
    }
}