import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseURLService {
  constructor() {}

  getBaseURL() {
    return 'http://localhost:3000';
  }
}
