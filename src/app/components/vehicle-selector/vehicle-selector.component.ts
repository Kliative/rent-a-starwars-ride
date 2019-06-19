import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SWVehicleObj, SWVehicle } from '../../models/SWVehicle.model';
import { SWVStarShipObj, SWVStarShip } from '../../models/SWStarShip.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReservationObj } from '../../models/reservationModal.model';
import { RandomUser, RandomUsers } from '../../models/user.model';

@Component({
  selector: 'app-vehicle-selector',
  templateUrl: './vehicle-selector.component.html',
  styleUrls: ['./vehicle-selector.component.css']
})
export class VehicleSelectorComponent implements OnInit {
  @Input() randomUserObj: RandomUsers;
  @Output() reservationEvent = new EventEmitter();

  @Input() SWVehicleObj: SWVehicleObj;
  @Input() SWStarShipObj: SWVStarShipObj;

  sWVehicle: SWVehicle;
  sWStarShip: SWVStarShip;

  staggedModal: ReservationObj;

  toggleVSS = true;
  ssTitle: string;
  vTitle: string;
  closeResult: string;

  constructor(private _dS: DataService, private modalService: NgbModal) {
    this.ssTitle = 'Star Ships';
    this.vTitle = 'Vehicles';
  }

  ngOnInit() {

  }

  toggleVehicleStarShip(): void {
    this.toggleVSS = !this.toggleVSS;
  }

  // Modal
  selectedUserForReservation(user: RandomUser): void {
    this.staggedModal.name = user.name.first + user.name.last;
    this.staggedModal.email = user.email;
  }


  open(content: NgbModal, url: string, isVehicle: boolean) {

    // Check if Vehicle
    if (isVehicle) {
      this._dS.getSWDataFactory().starShipSingle(url).subscribe((res: SWVStarShip) => {
        if (res) {
          this.sWStarShip = res;
          this.staggedModal = this.createNewReservationObj(this.sWStarShip);
        }
      });
    } else {
      this._dS.getSWDataFactory().vehiclesSingle(url).subscribe((res: SWVehicle) => {
        if (res) {
          this.sWVehicle = res;
          this.staggedModal = this.createNewReservationObj(this.sWVehicle);
        }
      });
    }

    // Modal
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      // close Modal
      this.closeResult = `Closed with: ${result}`;
      this.saveBooking();
      delete this.staggedModal;
    }, (reason) => {
      delete this.staggedModal;
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  createNewReservationObj(vhcleOrStrShip: SWVehicle | SWVStarShip): ReservationObj {
    let staggedModal = new ReservationObj();
    staggedModal.booked.push({
      model: vhcleOrStrShip.model,
      urlID: vhcleOrStrShip.url,
    })
    staggedModal.vehicleObj = vhcleOrStrShip;
    staggedModal.bookingstatus = this.isVehicleBooked(vhcleOrStrShip.cost_in_credits);
    return staggedModal;
  }

  isVehicleBooked(status: string): boolean {
    if (status === 'unknown') {
      return true;
    } else {
      return false;
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
  saveBooking(): void {
    this.reservationEvent.emit(this.staggedModal);
  }
}