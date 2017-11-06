import { AUTH_PROVIDERS } from 'angular2-jwt';
import * as Raven from 'raven-js';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';

import { AuthService } from './services/auth.service';
import { CallbackComponent } from './components/shared/callback.component';
import { VehicleService } from './services/vehicle.service';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { AppErrorHandler } from './components/app/app.error-handler';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { PaginationComponent } from './components/shared/pagination.component';
import { VehicleViewComponent } from './components/vehicle-view/vehicle-view.component';
import { PhotoService } from './services/photo.service';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

Raven.config('https://145a32344615426eb732243dd9830b72@sentry.io/186959').install();

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CounterComponent,
    FetchDataComponent,
    HomeComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent,
    VehicleViewComponent,
    CallbackComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ToastyModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [ AuthGuard ] },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [ AuthGuard ] },
      { path: 'vehicles/:id', component: VehicleViewComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'home', component: HomeComponent },
      { path: 'admin', component: AdminComponent, canActivate: [ AdminAuthGuard ] },
      { path: 'callback', component: CallbackComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    AUTH_PROVIDERS,
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    VehicleService,
    PhotoService
  ]
})
export class AppModuleShared {
}
