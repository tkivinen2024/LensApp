import { Injectable } from '@angular/core';

import { LensItem } from '../interface/lensitem';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  constructor() {}

  validateLensItem(lensItem: LensItem): boolean {
    return lensItem &&
      lensItem.name &&
      lensItem.category &&
      lensItem.focallength &&
      lensItem.category &&
      lensItem.price != undefined &&
      lensItem.price >= 0
      ? true
      : false;
  }

  validateCredentials(user: User): boolean {
    return user && user.username?.length && user.password?.length
      ? true
      : false;
  }
}
