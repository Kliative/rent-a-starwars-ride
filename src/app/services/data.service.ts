import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RandomUsers, RandomUser } from '../models/user.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SWVehicleObj, SWVehicle } from '../models/SWVehicle.model';
import { SWVStarShipObj, SWVStarShip } from '../models/SWStarShip.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getRandomUsers(numberOfUsers: number): Observable<RandomUsers> {
    return this.http.get<RandomUsers>(`https://randomuser.me/api/?results=${numberOfUsers}`);
  }

  getSWDataFactory(){
    return {
      vehicleObj: (): Observable<SWVehicleObj> => {
        return this.http.get<SWVehicleObj>(`https://swapi.co/api/vehicles`);
      },
      vehiclesSingle: (vehicleUrl:string): Observable<SWVehicle> => {
        return this.http.get<SWVehicle>(vehicleUrl);
      },
      starShipObj:(): Observable<SWVStarShipObj> => {
        return this.http.get<SWVStarShipObj>(`https://swapi.co/api/starships`);
      },
      starShipSingle: (starShipUrl:string): Observable<SWVStarShip> => {
        return this.http.get<SWVStarShip>(starShipUrl);
      }
    }
  }
}