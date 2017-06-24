import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

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

}
