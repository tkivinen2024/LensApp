import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseURLService } from './base-url.service';
import { AuthService } from './auth.service';

import { User } from '../interface/user';
import { LensItem } from '../interface/lensitem';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private baseURLService: BaseURLService,
    private authService: AuthService
  ) {}

  private createHeaders(
    contentTypeAppJSON: boolean,
    authorizationToken: boolean
  ): { headers: HttpHeaders } {
    let httpHeaders = new HttpHeaders();
    if (contentTypeAppJSON) {
      httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    }
    if (authorizationToken) {
      httpHeaders = httpHeaders.set(
        'Authorization',
        this.authService.getAuthorizationToken()
      );
    }
    return { headers: httpHeaders };
  }

  private createURL(relativeEndpoint: string): string {
    return this.baseURLService.getBaseURL() + relativeEndpoint;
  }

  public authenticate(user: User): Observable<any> {
    return this.http.post(
      this.createURL('/user/authenticate'),
      user,
      this.createHeaders(true, false)
    );
  }

  public getLenses(): Observable<any> {
    return this.http.get(this.createURL('/lens/items'));
  }

  public postLensItem(lensItem: LensItem): Observable<any> {
    return this.http.post(
      this.createURL('/lens/items'),
      { item: lensItem },
      this.createHeaders(true, true)
    );
  }

  public deleteLensItem(lensItem: LensItem): Observable<any> {
    return this.http.delete(
      this.createURL(`/lens/items/${lensItem._id}`),
      this.createHeaders(false, true)
    );
  }
  
}
