import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { PreferencesService } from './preferences.service';
import { Config } from '../app.config';
import { AlertController } from '@ionic/angular';
import { nextContext } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class InstallerService {

  constructor(private netService: NetworkService,
    private preferences: PreferencesService,
    private config: Config,
    public alertController: AlertController) { 

      this.initApp()
  }

  private initApp() {
    let baseUrl = this.preferences.getString(this.config.BASE_URL)
    if(baseUrl === null) {
      this.presentAlert(url => {
        this.preferences.putString(this.config.BASE_URL, url)
      })
    }
  }

  onReady(next: Function, error: Function) {
    let url = this.preferences.getString(this.config.BASE_URL)
    this.netService.ping(url, next, error)
  }

  async presentAlert(next) {
    const alert = await this.alertController.create({
      header: 'Module WiFi indisponible',
      inputs: [
        {
          name: 'url',
          type: 'text',
          placeholder: 'Adresse Ip ou URL',
          value: 'http://localhost:8081/telerupteurs'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: "OK",
          handler: data => {
            next(data.url)
          }
        }
      ]
    });

    await alert.present();
  }

}
