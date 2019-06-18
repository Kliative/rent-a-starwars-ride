import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SWVehicleObj } from '../../models/SWVehicle.model';
import { SWVStarShipObj } from 'src/app/models/SWStarShip.model';

@Component({
  selector: 'app-vehicle-selector',
  templateUrl: './vehicle-selector.component.html',
  styleUrls: ['./vehicle-selector.component.css']
})
export class VehicleSelectorComponent implements OnInit {

  SWVehicleObj: SWVehicleObj;
  SWStarShipObj: SWVStarShipObj;
  constructor(private _dS: DataService) { }

  ngOnInit() {
    this._dS.getSWDataFactory().vehicleObj().subscribe((results: SWVehicleObj) => {
      this.SWVehicleObj = results;
    });

    this._dS.getSWDataFactory().starShipObj().subscribe((results: SWVStarShipObj) => { 
      this.SWStarShipObj = results;
    })
  }

}