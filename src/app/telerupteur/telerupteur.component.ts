import { Component, OnInit } from '@angular/core';
import { Telerupteur } from '../model/telerupteur.model';
import { TelerupteurService } from '../services/telerupteur.service';

@Component({
  selector: 'app-telerupteur',
  templateUrl: './telerupteur.component.html',
  styleUrls: ['./telerupteur.component.scss'],
})
export class TelerupteurComponent implements OnInit {

  private model: Telerupteur
  private changed: boolean = false

  constructor(private teleService: TelerupteurService) { }

  ngOnInit() {
    this.model = this[0]
  }

  update() {
    this.changed = true;
  }

  isChanged() {
    return this.changed
  }

  save() {
    this.teleService.updateTelerupteur(this.model)
  }

}
