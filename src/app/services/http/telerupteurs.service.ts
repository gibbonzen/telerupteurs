import { Injectable } from '@angular/core';
import { HTTPService } from './http.service';
import { Telerupteur } from '../../model/telerupteur.model';
import { PreferencesService } from '../preferences.service';
import { Config } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class TelerupteursService {

  private URL: string = this.preferences.getString(this.config.BASE_URL)
  private telerupteurs: Telerupteur[]

  constructor(public config: Config, 
    private preferences: PreferencesService,
    private httpService: HTTPService) { 

      this.preferences.subscribe(this.config.BASE_URL, () => this.getTelerupteurs(() => {}))
    }

    getTelerupteurs(next: Function) {
      this.httpService.get<Telerupteur[]>(this.URL)
        .subscribe((tl: Telerupteur[]) => {
          this.telerupteurs = tl
          next(tl)
        })
    }

    getLoadedTelerupteurs() {
      return this.telerupteurs
    }

    enable(telerupteur: Telerupteur) {
      this.httpService.post(this.URL, undefined).subscribe()
    }
  
}
