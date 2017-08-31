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
  query: any = {};
  columns;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.columns = [
      { title: 'Id' },
      { title: 'Make', key: 'make', isSortable: true },
      { title: 'Model', key: 'model', isSortable: true },
      { title: 'Contact Name', key: 'contactName', isSortable: true },
      { }
    ];

    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.populateVehicles();
  }

  onFilterChange() {
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {};
    this.onFilterChange();
  }

  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }

    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query)
      .subscribe(vehicles => this.vehicles = vehicles);

  }

}
