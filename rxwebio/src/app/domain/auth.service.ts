import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Auth0Lock from 'auth0-lock';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  auth0Options = {
    theme: {
      // logo: 'http://logo.radixoffice.com/images/Logo_100x75(transparent).png',
      primaryColor: '#0c7dc5',
      foreGroundColor:"#000",
    },
    auth: {
      redirectUrl: environment.auth0.callbackURL,
      responseType: 'token id_token',
      audience: `https://${environment.auth0.domain}/userinfo`,
      params: {
        scope: 'openid profile'
      }
    },
    allowedConnections: ['windowslive', 'google-oauth2', 'facebook','github'],
    autoclose: true,
    oidcConformant: true,
    languageDictionary: {
      title: "Rx Web"
    },
  };

  lock = new Auth0Lock(
    environment.auth0.clientId,
    environment.auth0.domain,
    this.auth0Options
  );

  constructor(private router: Router) {
    this.lock.on('authenticated', (authResult: any) => {
      localStorage.setItem('isLoggedIn', "true");
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          throw new Error(error);
        }
        localStorage.setItem('token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        this.router.navigate(['/getting-started']);
      });
    });

    this.lock.on('authorization_error', error => {
      this.lock.show({
        flashMessage: {
          type: 'error',
          text: error.error_description
        }
      });
    });
  }

  login() {
    this.lock.show();
  }

  logout() {
    this.router.navigate(['/']);
    localStorage.removeItem('profile');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    // ...implement logout
  }
}