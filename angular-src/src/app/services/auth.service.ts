import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private helper = new JwtHelperService();

  constructor() {}

  public getAuthorizationToken(): string {
    return `JWT ${window.localStorage.getItem('id_token')}`;
  }

  public storeAuthenticatedUser(user: User, token: string): void {
    window.localStorage.setItem('id_token', token);
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  public updateAuthenticatedUser(user: User): void {
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  public removeAuthenticatedUser(): void {
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('user');
  }

  public isUserAuthenticated(): boolean {
    let loggedIn;
    try {
      loggedIn = !this.helper.isTokenExpired(
        window.localStorage.getItem('id_token') ?? undefined
      );
    } catch (err) {
      loggedIn = false;
    }
    return loggedIn;
  }
}
