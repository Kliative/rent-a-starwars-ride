import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReservationObj } from './models/reservationModal.model';
import { DataService } from './services/data.service';
import { RandomUsers } from './models/user.model';
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

  start: ReservationObj[] = [{
    booked: [{
      model: 'Executor-class star dreadnought',
      urlID: 'https://swapi.co/api/starships/15/'
    }],
    name: 'maevaginnish',
    email: 'maeva.ginnish@example.com',
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


  constructor(private modalService: NgbModal, private _rndmUsrSrv: DataService) { }

  ngOnInit(): void {
    this.currentlyRentedOut = this.start;
    this._rndmUsrSrv.getRandomUsers(5).subscribe((result: any) => {
      this.randomUserObj = result;
    })
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

  findUserWithBooking(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].email === nameKey) {
        return myArray[i];
      }
    }
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
