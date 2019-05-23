import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { TelerupteurComponent } from '../telerupteur/telerupteur.component';
import { Telerupteur } from '../model/telerupteur.model';
import { TelerupteurService } from '../services/telerupteur.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private changed: boolean = false

  constructor(private router: Router,
    public popoverController: PopoverController,
    private telerupteurService: TelerupteurService) { }

  ngOnInit() {
  }

  async presentPopover(ev: any, model: Telerupteur) {
    const popover = await this.popoverController.create({
      component: TelerupteurComponent,
      componentProps: [model],
      event: ev,
      translucent: true
    });
    return await popover.present();
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
