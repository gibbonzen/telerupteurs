import { Component, OnInit } from '@angular/core';
import { TelerupteurService } from '../services/telerupteur.service';
import { Telerupteur } from '../model/telerupteur.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private teleService: TelerupteurService) { }

  ngOnInit() { }

  display() {
    return this.teleService.count() > 0
  }

  getTelerupteurs() {
    return this.teleService.getTelerupteurs()
  }

  enable(telerupteur: Telerupteur) {
    this.teleService.enable(telerupteur)
  }

  isOn(telerupteur: Telerupteur): boolean {
    return telerupteur.enabled
  }
}
