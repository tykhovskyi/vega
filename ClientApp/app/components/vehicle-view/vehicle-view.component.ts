import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'ng-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styles: []
})
export class VehicleViewComponent implements OnInit {
  private readonly VEHICLES_URI = '/vehicles';

  vehicle: any;
  vehicleId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toasty: ToastyService,
    private vehicleService: VehicleService) {

    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate([this.VEHICLES_URI]);
        return;
      }
    });
  }

  ngOnInit() {
    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate([this.VEHICLES_URI]);
            return;
          }
        }
      );
  }
  
  delete() {
    if (confirm('Are you sure?')) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate([this.VEHICLES_URI]);
        })
    }
  }
}
