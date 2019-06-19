export class ReservationObj {
    booked: BookedVehicle[];
    name: string;
    email: string;
    from: DateCustom;
    to: DateCustom;
    bookingstatus: boolean;
    constructor() {
        this.booked = [];
        this.name = '';
        this.email = '';
        this.from = new DateCustom();
        this.to = new DateCustom();
        this.bookingstatus = false;
    }
}

export class BookedVehicle {
    model: string;
    urlID: string;
    // userEmail:string;
}

export class DateCustom {
    year: number;
    month: number;
    day: number;
}