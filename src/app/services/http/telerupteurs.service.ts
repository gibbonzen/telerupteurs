import { Injectable } from '@angular/core';
import { HTTPService } from './http.service';
import { Telerupteur } from '../../model/telerupteur.model';
import { PreferencesService } from '../preferences.service';
import { Config } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class TelerupteursService {

  private URL = () => this.preferences.getString(this.config.BASE_URL)
  private telerupteurs: Telerupteur[]

  constructor(public config: Config, 
    private preferences: PreferencesService,
    private httpService: HTTPService) { 

      this.preferences.subscribe(this.config.BASE_URL, () => this.getTelerupteurs(() => {}))
    }

    getTelerupteurs(next: Function) {
      this.httpService.get<Telerupteur[]>(this.URL())
        .subscribe((tl: Telerupteur[]) => {
          this.telerupteurs = tl
          next(tl)
        },
        err => {
          this.telerupteurs = []
          next([])
        })
    }

    getTelerupteur(attr: any): Telerupteur {
      return this.telerupteurs.find(t => Object.keys(attr).every(k => attr[k] == t[k]))
    }

    getLoadedTelerupteurs() {
      return this.telerupteurs
    }

    enable(telerupteur: Telerupteur) {
      this.httpService.put<Telerupteur>(`${this.URL()}/${telerupteur.id}`, undefined).subscribe()
    }

    count() {
      return this.telerupteurs.length +1 || 0
    }
  
    exists(telerupteur: Telerupteur) {
      return this.telerupteurs.some(t => t.id === telerupteur.id)
    }

    addTelerupteur(telerupteur: Telerupteur) {
      console.log(`Add new telerupteur : ${telerupteur}`)
      this.httpService.post<Telerupteur>(this.URL(), telerupteur).subscribe((data: Telerupteur) => this.telerupteurs.push(data))
    }

    updateTelerupteur(telerupteur: Telerupteur) {
      console.log(`Update new telerupteur : ${telerupteur}`)
      this.httpService.put<Telerupteur>(`${this.URL()}/${telerupteur.id}`, telerupteur).subscribe()
    }

    removeTelerupteur(telerupteur: Telerupteur) {
      console.log(`Remove new telerupteur : ${telerupteur}`)
      this.httpService.delete(`${this.URL()}/${telerupteur.id}`).subscribe((data: Telerupteur[]) => this.telerupteurs = data)
    }
}
