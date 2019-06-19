import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VehicleSelectorComponent } from './components/vehicle-selector/vehicle-selector.component';
import { CustomerSelectorComponent } from './components/customer-selector/customer-selector.component';
import { CurrentlyRentedOutComponent } from './components/currently-rented-out/currently-rented-out.component';
import { AddNewVehicleComponent } from './components/add-new-vehicle/add-new-vehicle.component';

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule, 
    NgbModule.forRoot(), 
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent, 
    VehicleSelectorComponent, 
    CustomerSelectorComponent, 
    CurrentlyRentedOutComponent,
    AddNewVehicleComponent
  ],
  bootstrap: [AppComponent],
  providers: [DataService]
})
export class AppModule { }
