import { Injectable } from '@angular/core';
import { Telerupteur } from '../model/telerupteur.model';
import { HttpClient } from '@angular/common/http';
import { addToViewTree } from '@angular/core/src/render3/instructions';
import { SocketService, SocketEvent } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class TelerupteurService {

  private baseUrl: string = 'http://localhost:8081/telerupteurs'
  private telerupteurs: Telerupteur[]

  constructor(private http: HttpClient,
    private socketService: SocketService) { }

  private loadTelerupteurs() {
    this.http.get<Telerupteur[]>(this.baseUrl).subscribe((data: Telerupteur[]) => this.telerupteurs = data)

    let event: SocketEvent = {
      name: 'change',
      next: console.log
    }
    this.socketService.connect(this.baseUrl, event)
  }

  getTelerupteurs(): Telerupteur[] {
    if(!this.telerupteurs) this.loadTelerupteurs()
    return this.telerupteurs
  }

  count(): number {
    let lastID = this.telerupteurs[this.telerupteurs.length -1].id
    return ++lastID
  }

  enable(telerupteur: Telerupteur) {
    this.http.put(`${this.baseUrl}/${telerupteur.id}`, undefined).subscribe()
  }

  updateTelerupteur(telerupteur: Telerupteur) {
    if(!this.exists(telerupteur)) this.addTelerupteur(telerupteur)
    else 
      this.http.put(`${this.baseUrl}/${telerupteur.id}`, telerupteur).subscribe()
  }

  private exists(telerupteur: Telerupteur): boolean {
    return this.telerupteurs.every(t => t.id === telerupteur.id)
  }

  addTelerupteur(telerupteur: Telerupteur) {
    this.http.post(`${this.baseUrl}`, telerupteur).subscribe((data: Telerupteur) => this.telerupteurs.push(data))
  }
}
