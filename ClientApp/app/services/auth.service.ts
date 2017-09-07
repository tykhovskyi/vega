import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

import Auth0Lock from 'auth0-lock';

@Injectable()
export class AuthService {
  private readonly tokenName = 'token';

  lock = new Auth0Lock(
    'kMUWBQo5g6aqWWrVIIU65Yi6HFCZuyfl',
    'tykhovskyi.eu.auth0.com'
  );

  constructor() {
    this.lock.on("authenticated", (authResult) => {
      console.log('authResult', authResult);
      localStorage.setItem(this.tokenName, authResult.idToken);
    });
  }

  login() {
    this.lock.show();
  }

  authenticated() {
    return tokenNotExpired(this.tokenName);
  }

  logout() {
    localStorage.removeItem(this.tokenName);
  }

}
