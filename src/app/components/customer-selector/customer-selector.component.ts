import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RandomUsers, RandomUser } from '../../models/user.model';
@Component({
  selector: 'app-customer-selector',
  templateUrl: './customer-selector.component.html',
  styleUrls: ['./customer-selector.component.css']
})
export class CustomerSelectorComponent implements OnInit {
  @Output() valueChange = new EventEmitter();
  @Input() randomUserObj: RandomUsers;
  buttonActived = false;
  randomUser: RandomUser[];

  constructor() { }

  ngOnInit() {

  }

  userResevredPressed(user: RandomUser): void {
    user.active = true;
    this.valueChange.emit(user);
  }
}