import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  profile: any;

  auth0 = new auth0.WebAuth({
    clientID: 'uqcMH7xMCM5tDF6Mu13lItqAtn8TwZIH',
    domain: 'tykhovskyi.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://tykhovskyi.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:5000/callback',      
    scope: 'openid'
  });

  constructor(public router: Router) {    
    this.readUserFromLocalStorage();
  }

  public isInRole(roleName: string): boolean {
    if (this.profile && this.profile.roles)
      return this.profile.roles.indexOf(roleName) > -1;

    return false;
  }

  public login(): void {
    this.auth0.authorize();
  }
  
  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      // console.log(authResult)
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.setSession(authResult);
      } else if (err) {
        console.log(err);
      }
      this.router.navigate(['/vehicles']);
    });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');

    this.profile = null;

    // Go back to the home route
    this.router.navigate(['/vehicles']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }


  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('expires_at', expiresAt);

    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (err)
        throw err;

      // console.log(profile);
      localStorage.setItem('profile', JSON.stringify(profile));
      
      this.readUserFromLocalStorage();
    });
  }

  private readUserFromLocalStorage() {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

}
