import { SWVehicle } from "./SWVehicle.model";

import { SWVStarShip } from "./SWStarShip.model";

export class ReservationObj {
    booked: BookedVehicle[];
    name: string;
    email: string;
    from: DateCustom;
    to: DateCustom;
    bookingstatus: boolean;
    vehicleObj?: Object;
    constructor() {
        this.booked = [];
        this.name = '';
        this.email = '';
        this.from = new DateCustom();
        this.to = new DateCustom();
        this.bookingstatus = false;
        this.vehicleObj = {};
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