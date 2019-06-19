import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-new-vehicle',
  templateUrl: './add-new-vehicle.component.html',
  styleUrls: ['./add-new-vehicle.component.css']
})
export class AddNewVehicleComponent implements OnInit {
  newVehicle: FormGroup;
  submitted = false;
  @Output() submitNewVehicle = new EventEmitter();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newVehicle = this.fb.group({
      type: '',
      name: '',
      model: '',
      manufacturer: '',
      vehicle_class: '',
      starship_class: '',
      cost_in_credits: Number(''),
      url: 'https://swapi.co/api/starships/9/'
    });
  }
  toggleSubmit(): void {
    this.submitted = !this.submitted;
    this.newVehicle = this.fb.group({
      type: '',
      name: '',
      model: '',
      manufacturer: '',
      vehicle_class: '',
      starship_class: '',
      cost_in_credits: Number(''),
      url: 'https://swapi.co/api/starships/9/'
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.submitNewVehicle.emit(this.newVehicle.value);
  }

}
