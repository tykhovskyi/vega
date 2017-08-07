import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

import { SaveVehicle } from './../models/saveVehicle';

@Injectable()
export class VehicleService {
  private originUrl = 'http://localhost:5000';

  constructor(private http: Http) { }

  getMakes() {
    return this.http.get(this.originUrl + '/api/makes')
      .map(res => res.json());
  }

  getFeatures() {
    return this.http.get(this.originUrl + '/api/features')
      .map(res => res.json());
  }
  
  create(vehicle) {
    return this.http.post(this.originUrl + '/api/vehicles', vehicle)
      .map(res => res.json());
  }

  getVehicle(id) {
    return this.http.get(this.originUrl + '/api/vehicles/' + id)
      .map(res => res.json());
  }

  update(vehicle: SaveVehicle) {
    return this.http.put(this.originUrl + '/api/vehicles/' + vehicle.id, vehicle)
      .map(res => res.json());
  }

  delete(id) {
    return this.http.delete(this.originUrl + '/api/vehicles/' + id)
      .map(res => res.json());
  }

  getVehicles() {
    return this.http.get(this.originUrl + '/api/vehicles')
      .map(res => res.json());
  }
}
