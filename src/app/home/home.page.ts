import { Component, OnInit } from '@angular/core';
import { InstallerService } from '../services/installer.service';
import { TelerupteursService } from '../services/http/telerupteurs.service';
import { Telerupteur } from '../model/telerupteur.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private isRunnabled = false

  constructor(private teleService: TelerupteursService,
    private installer: InstallerService) { }

  ngOnInit() { 
    this.installer.onReady(() => this.loadTelerupteurs(), console.log)
    this.installer.onSocketReady(() => this.listenSocket())
  }

  display() {
    return this.isRunnabled
  }

  loadTelerupteurs() {
    this.teleService.getTelerupteurs(() => this.isRunnabled = true)
  }

  getTelerupteurs() {
    return this.teleService.getLoadedTelerupteurs()
  }

  enable(telerupteur: Telerupteur) {
    this.teleService.enable(telerupteur)
  }

  isOn(telerupteur: Telerupteur): boolean {
    return telerupteur.enabled
  }

  listenSocket() {
    this.teleService.listenSocket()
  }


}
