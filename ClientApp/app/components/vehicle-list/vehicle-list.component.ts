import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { KeyValuePair } from '../../models/keyValuePair';

@Component({
  selector: 'ng-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styles: []
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;

  queryResult: any = {};
  makes: KeyValuePair[];
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns;

  constructor(private vehicleService: VehicleService, private auth: AuthService) { }

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
    this.query.page = 1;
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
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

  onPageChange(page) {
    this.query.page = page;
    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query)
      .subscribe(result => this.queryResult = result);

  }

}
