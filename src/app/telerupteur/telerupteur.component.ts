import { Component, OnInit, Input } from '@angular/core';
import { Telerupteur } from '../model/telerupteur.model';
import { TelerupteurService } from '../services/telerupteur.service';
import { NavParams, NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-telerupteur',
  templateUrl: './telerupteur.component.html',
  styleUrls: ['./telerupteur.component.scss'],
})
export class TelerupteurComponent implements OnInit {

  @Input() model: Telerupteur
  private changed: boolean = false

  constructor(private navParams: NavParams,
    public alertController: AlertController,
    private teleService: TelerupteurService) { }

  ngOnInit() {
    let modal = this.navParams.get('modal')
    this.back = modal.dismiss
  }

  update() {
    this.changed = true;
  }

  isChanged() {
    return this.changed
  }

  save() {
    this.teleService.updateTelerupteur(this.model)
    this.changed = false
  }

  back() {
    this.back()
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: `Suppression du télérupteur: <strong>${this.model.name}</strong>`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancer',
          cssClass: 'secondary',
          handler: no => {}
        }, {
          text: 'Supprimer',
          handler: () => {
            this.teleService.removeTelerupteur(this.model)
            this.back()
          }
        }
      ]
    });

    await alert.present();
  }

  isNew(): boolean {
    return this.teleService.exists(this.model)
  }

}
