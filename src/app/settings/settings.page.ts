import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, NavController, ModalController } from '@ionic/angular';
import { Telerupteur } from '../model/telerupteur.model';
import { TelerupteurService } from '../services/telerupteur.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private changed: boolean = false
  private baseURL: string

  constructor(private router: Router,
    public popoverController: PopoverController,
    public modalController: ModalController,
    private telerupteurService: TelerupteurService) { }

  ngOnInit() {
    this.baseURL = this.telerupteurService.getBaseUrl()
  }

  change() {
    this.changed = true
  }

  isChanged(): boolean {
    return this.changed
  }

  save(url: HTMLIonInputElement): void {
    this.changed = false
    this.telerupteurService.setUrl(url.value)
  }

  push(telerupteur: Telerupteur) {
    this.router.navigate(['/telerupteurs'], { queryParams: { id: telerupteur.id }})
  }

  getTelerupteurs(): Telerupteur[] {
    return this.telerupteurService.getTelerupteurs()
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
