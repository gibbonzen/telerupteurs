import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Telerupteur } from '../model/telerupteur.model';
import { TelerupteursService } from '../services/http/telerupteurs.service';
import { PreferencesService } from '../services/preferences.service';
import { Config } from '../app.config';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private changed: boolean = false
  private baseURL: string
  private socketURL: string

  constructor(private router: Router,
    private telerupteurService: TelerupteursService,
    private config: Config, 
    private preferences: PreferencesService) { }

  ngOnInit() {
    this.baseURL = this.preferences.getString(this.config.BASE_URL)
    this.socketURL = this.preferences.getString(this.config.SOCKET_URL)
  }

  change() {
    this.changed = true
  }

  isChanged(): boolean {
    return this.changed
  }

  save(url: HTMLIonInputElement): void {
    this.changed = false
    this.preferences.putString(this.config.BASE_URL, url.value)
  }

  push(telerupteur: Telerupteur) {
    this.router.navigate(['/telerupteurs'], { queryParams: { id: telerupteur.id }})
  }

  getTelerupteurs(): Telerupteur[] {
    return this.telerupteurService.getLoadedTelerupteurs()
  }

  createNew() {
    return {
      id: this.telerupteurService.count(),
      name: "Nouveau télérupteur",
      route: "/nouveau-telerupteur",
      enabled: false
    }
  }

}
