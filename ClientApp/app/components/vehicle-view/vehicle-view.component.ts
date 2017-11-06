import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { BrowserXhr } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

import { VehicleService } from '../../services/vehicle.service';
import { PhotoService } from '../../services/photo.service';
import { BrowserXhrWithProgress, ProgressService } from '../../services/progress.service';

@Component({
  selector: 'ng-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  providers: [
    { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
    ProgressService
  ]
})
export class VehicleViewComponent implements OnInit {
  private readonly VEHICLES_URI = '/vehicles';

  @ViewChild('fileInput') fileInput: ElementRef;
  vehicle: any;
  vehicleId: number;
  photos: any;
  progress: any;

  constructor(
    private auth: AuthService,
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private toasty: ToastyService,
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    private progressService: ProgressService) {

    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate([this.VEHICLES_URI]);
        return;
      }
    });
  }

  ngOnInit() {
    this.photoService.getPhotos(this.vehicleId)
      .subscribe(photos => this.photos = photos);

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

  uploadPhoto() {    
    this.progressService.startTracking()
      .subscribe(progress => {
          console.log(progress);
          this.zone.run(() => {
            this.progress = progress;
          });
        },
        null,
        () => { this.progress = null; }
      );
      
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file = nativeElement.files[0];
    nativeElement.value = '';
    
    this.photoService.upload(this.vehicleId, file)
      .subscribe(photo => {
        this.photos.push(photo);
      },
      err => {
        this.toasty.error({
          title: 'Error',
          msg: err.text(),
          theme: 'bootstrap',
          showClose: true,
          timeout: 5000
        });
      });
  }
}
