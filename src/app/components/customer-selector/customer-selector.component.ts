import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RandomUsers, RandomUser } from '../../models/user.model';
@Component({
  selector: 'app-customer-selector',
  templateUrl: './customer-selector.component.html',
  styleUrls: ['./customer-selector.component.css']
})
export class CustomerSelectorComponent implements OnInit {

  randomUserObj: RandomUsers;
  randomUser: RandomUser[];

  constructor(private _rndmUsrSrv: DataService) { }

  ngOnInit() {
    this._rndmUsrSrv.getRandomUsers(5).subscribe((result: any) => {
      this.randomUserObj = result;
    })
  }

}