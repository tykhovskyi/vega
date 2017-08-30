import { Component, OnInit } from '@angular/core';

import { Vehicle } from '../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { KeyValuePair } from '../../models/keyValuePair';

@Component({
  selector: 'ng-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styles: []
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  makes: KeyValuePair[];
  filter: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.populateVehicles();
  }

  onFilterChange() {
    this.filter.modelId = 2;
    this.populateVehicles();
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.filter)
      .subscribe(vehicles => this.vehicles = vehicles);

  }

}
