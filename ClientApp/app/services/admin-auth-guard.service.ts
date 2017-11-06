import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';

@Injectable()
export class AdminAuthGuard extends AuthGuard {
  
  constructor(auth: AuthService) {
    super(auth);
  }

  public canActivate(): boolean {
    const isAuthenticated = super.canActivate();
    
    return isAuthenticated ? this.auth.isInRole('Admin') : false;
  }
}
