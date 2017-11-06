import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { SaveVehicle } from './../models/saveVehicle';

@Injectable()
export class VehicleService {
  private readonly originUrl = 'http://localhost:5000';
  private readonly vehiclesEndpoint = '/api/vehicles';

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getMakes() {
    return this.http.get(this.originUrl + '/api/makes')
      .map(res => res.json());
  }

  getFeatures() {
    return this.http.get(this.originUrl + '/api/features')
      .map(res => res.json());
  }
  
  create(vehicle) {
    return this.authHttp.post(this.originUrl + this.vehiclesEndpoint, vehicle)
      .map(res => res.json());
  }

  update(vehicle: SaveVehicle) {
    return this.authHttp.put(this.originUrl + this.vehiclesEndpoint + '/' + vehicle.id, vehicle)
      .map(res => res.json());
  }

  delete(id) {
    return this.authHttp.delete(this.originUrl + this.vehiclesEndpoint + '/' + id)
      .map(res => res.json());
  }

  getVehicle(id) {
    return this.http.get(this.originUrl + this.vehiclesEndpoint + '/' + id)
      .map(res => res.json());
  }

  getVehicles(filter) {
    return this.http.get(this.originUrl + this.vehiclesEndpoint + '?' + this.toQueryString(filter))
      .map(res => res.json());
  }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }

    return parts.join('&');
  }
}
