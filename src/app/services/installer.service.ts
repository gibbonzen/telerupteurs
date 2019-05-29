import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { PreferencesService } from './preferences.service';
import { Config } from '../app.config';
import { AlertController } from '@ionic/angular';
import { TelerupteursSocketService } from './socket/telerupteurs-socket.service';

@Injectable({
  providedIn: 'root'
})
export class InstallerService {

  constructor(private netService: NetworkService,
    private preferences: PreferencesService,
    private config: Config,
    public alertController: AlertController,
    private socketService: TelerupteursSocketService) { 
  }

  private initApp(next: Function) {
    // Set initial preferences value
    this.preferences.putString(this.config.TELERUPTEURS_URL, '/telerupteurs')
    this.preferences.subscribe(this.config.BASE_URL, () => 
      this.preferences.putString(this.config.SOCKET_URL, this.preferences.getString(this.config.BASE_URL) + '/telerupteurs'))

    let baseUrl = this.preferences.getString(this.config.BASE_URL)
    if(baseUrl === null) {
      this.presentAlert(url => {
        this.preferences.putString(this.config.BASE_URL, url)
        next()
      })
    }
    else {
      next()
    }
  }

  connectSocket(next: Function) {
    // Sockets
    let socketURL = this.preferences.getString(this.config.SOCKET_URL)
    this.socketService.connect(next)
  }

  onReady(next: Function, error: Function) {
    this.initApp(() => {
      let url = this.preferences.getString(this.config.BASE_URL)
      this.netService.ping(url, next, error)
    })
  }

  onSocketReady(next: Function) {
    this.connectSocket(next)
  }

  async presentAlert(next) {
    const alert = await this.alertController.create({
      header: 'Module WiFi indisponible',
      inputs: [
        {
          name: 'url',
          type: 'text',
          placeholder: 'Adresse Ip ou URL',
          value: ''
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
