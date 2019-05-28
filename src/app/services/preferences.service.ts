import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService extends EventEmitter {

  constructor(private storage: StorageService) { 
    super()
  }

  putString(key: string, value: string) {
    this.storage.setItem<string>(key, value)
    this.emit(key)
  }

  getString(key: string): string {
    return this.storage.getItem<string>(key)
  }


  subscribe(key: string, next: Function) {
    this.addListener(key, () => next())
  }

}
