import { Component, OnInit, Input } from '@angular/core';
import { Telerupteur } from '../model/telerupteur.model';
import { AlertController, NavController } from '@ionic/angular';
import { TelerupteurService } from '../services/telerupteur.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-telerupteurs',
  templateUrl: './telerupteurs.page.html',
  styleUrls: ['./telerupteurs.page.scss'],
})
export class TelerupteursPage implements OnInit {

  @Input() model: Telerupteur
  private changed: boolean = false

  constructor(private route: ActivatedRoute,
    private navCtrl: NavController,
    public alertController: AlertController,
    private teleService: TelerupteurService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.model = this.teleService.getTelerupteur(data.id)
      if(this.model === undefined) this.model = this.createNew()
    })
  }

  createNew() {
    return {
      id: this.teleService.count(),
      name: "Nouveau télérupteur",
      route: "/nouveau-telerupteur",
      enabled: false
    }
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
    this.navCtrl.pop()
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
