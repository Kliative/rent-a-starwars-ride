import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SWVehicleObj, SWVehicle } from '../../models/SWVehicle.model';
import { SWVStarShipObj, SWVStarShip } from '../../models/SWStarShip.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReservationObj } from '../../models/reservationModal.model';

@Component({
  selector: 'app-vehicle-selector',
  templateUrl: './vehicle-selector.component.html',
  styleUrls: ['./vehicle-selector.component.css']
})
export class VehicleSelectorComponent implements OnInit {

  SWVehicleObj: SWVehicleObj;
  SWStarShipObj: SWVStarShipObj;

  sWVehicle: SWVehicle;
  sWStarShip: SWVStarShip;

  staggedModal: ReservationObj;

  toggleVSS = false;
  ssTitle: string;
  vTitle: string;
  closeResult: string;

  constructor(private _dS: DataService, private modalService: NgbModal) {
    this.ssTitle = 'Star Ships';
    this.vTitle = 'Vehicles';
  }

  ngOnInit() {
    this._dS.getSWDataFactory().vehicleObj().subscribe((results: SWVehicleObj) => {
      this.SWVehicleObj = results;
    });

    this._dS.getSWDataFactory().starShipObj().subscribe((results: SWVStarShipObj) => {
      this.SWStarShipObj = results;
    });
  }

  toggleVehicleStarShip(): void {
    this.toggleVSS = !this.toggleVSS;
  }

  // Modal

  getSWShip(url: string): void {

  }

  getSWVehicle(url: string): void {
    this._dS.getSWDataFactory().vehiclesSingle(url).subscribe((res: SWVehicle) => {
      this.sWVehicle = res;
    });
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
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  createNewReservationObj(vhcleOrStrShip: SWVehicle | SWVStarShip): ReservationObj {
    let staggedModal = new ReservationObj();
    staggedModal.model = vhcleOrStrShip.model;
    staggedModal.urlID = vhcleOrStrShip.url;
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

}