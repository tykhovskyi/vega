import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

import Auth0Lock from 'auth0-lock';

@Injectable()
export class AuthService {
  private readonly tokenName = 'token';

  lock = new Auth0Lock('uqcMH7xMCM5tDF6Mu13lItqAtn8TwZIH', 'tykhovskyi.eu.auth0.com', {
    auth: {
      grant_types: [
        /* add your other required grants here or the grants that the client already has */,
        "password",
        "http://auth0.com/oauth/grant-type/password-realm"
    ],
      redirectUrl: 'https://YOUR_APP/callback',
      responseType: 'code',
      params: {
        scope: 'openid email' // Learn about scopes: https://auth0.com/docs/scopes
      }
    }
  });

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
