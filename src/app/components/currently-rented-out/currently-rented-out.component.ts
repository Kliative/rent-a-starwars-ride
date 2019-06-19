import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RandomUsers, RandomUser } from '../../models/user.model';
import { ReservationObj } from 'src/app/models/reservationModal.model';

@Component({
  selector: 'app-currently-rented-out',
  templateUrl: './currently-rented-out.component.html',
  styleUrls: ['./currently-rented-out.component.css']
})
export class CurrentlyRentedOutComponent implements OnInit {
  @Input() randomUserObj: RandomUsers;
  @Input() currentlyRentedOut: ReservationObj[];
  constructor() { 

  }

  ngOnInit() {
   
  }

}
