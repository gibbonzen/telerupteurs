import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item))
  }

  getItem<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key))
  }
}
