import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringUtilsService {
  static isString(value: any): value is string {
    if (typeof value === 'string') {
      return true;
    }
    return false;
  }
}
