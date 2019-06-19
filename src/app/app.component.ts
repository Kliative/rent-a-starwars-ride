import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReservationObj } from './models/reservationModal.model';
import { DataService } from './services/data.service';
import { RandomUsers } from './models/user.model';
import { SWVehicleObj } from './models/SWVehicle.model';
import { SWVStarShipObj } from './models/SWStarShip.model';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular';
  closeResult: string;
  randomUserObj: RandomUsers;
  currentlyRentedOut: ReservationObj[] = [];

  SWVehicleObj: SWVehicleObj;
  SWStarShipObj: SWVStarShipObj;

  start: ReservationObj[] = [{
    booked: [{
      model: 'Executor-class star dreadnought',
      urlID: 'https://swapi.co/api/starships/15/'
    }],
    name: 'Minttu Keranen',
    email: 'minttu.keranen@example.com',
    from: {
      year: 2019,
      month: 6,
      day: 7
    },
    to: {
      year: 2019,
      month: 6,
      day: 20
    },
    bookingstatus: false
  }, {
    booked: [{
      model: 'DS-1 Orbital Battle Station',
      urlID: 'https://swapi.co/api/starships/9/'
    }],
    name: 'Toby Lee',
    email: 'toby.lee@example.com',
    from: {
      year: 2019,
      month: 6,
      day: 20
    },
    to: {
      year: 2019,
      month: 6,
      day: 14
    },
    bookingstatus: false
  }]


  constructor(
    private modalService: NgbModal,
    private _rndmUsrSrv: DataService,
    private _dS: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.currentlyRentedOut = this.start;
    this._rndmUsrSrv.getRandomUsers(5).subscribe((result: any) => {
      this.randomUserObj = result;
    })
    this._dS.getSWDataFactory().vehicleObj().subscribe((results: SWVehicleObj) => {
      this.SWVehicleObj = results;
    });

    this._dS.getSWDataFactory().starShipObj().subscribe((results: SWVStarShipObj) => {
      this.SWStarShipObj = results;
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }
  saveReservation(e: ReservationObj): void {
    let existingUserObj: ReservationObj = this.findUserWithBooking(e.email, this.currentlyRentedOut);
    if (existingUserObj) {
      existingUserObj.booked.push({ model: e.booked[0].model, urlID: e.booked[0].urlID });
    } else {
      this.currentlyRentedOut.push(e);
    }
  }

  addNewVehicle(e): void {
    switch (e.type) {
      case 'V':
        this.SWVehicleObj.results.unshift(e);
        break;
      case 'SS':
        this.SWStarShipObj.results.unshift(e);
        break;
      default:
        break;
    }
  }

  private findUserWithBooking(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].email === nameKey) {
        return myArray[i];
      }
    }
  }

}
