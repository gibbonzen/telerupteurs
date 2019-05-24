import { Injectable } from '@angular/core';
import { Telerupteur } from '../model/telerupteur.model';
import { HttpClient } from '@angular/common/http';
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
    this.socketService.connect(this.baseUrl, {
      name: 'change',
      next: (o, n) => this.onChange(o, n)
    })
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

  exists(telerupteur: Telerupteur): boolean {
    return this.telerupteurs.some(t => t.id === telerupteur.id)
  }

  getTelerupteur(id) {
    return this.telerupteurs.find(t => t.id === Number(id))
  }

  addTelerupteur(telerupteur: Telerupteur) {
    this.http.post(this.baseUrl, telerupteur).subscribe((data: Telerupteur) => this.telerupteurs.push(data))
  }

  removeTelerupteur(telerupteur: Telerupteur) {
    this.http.delete(`${this.baseUrl}/${telerupteur.id}`).subscribe((data: Telerupteur[]) => this.telerupteurs = data)
  }

  private onChange(oldObj: Telerupteur, newObj: Telerupteur) {
    //console.log(`Le télérupteur ${newObj.name} a été ${newObj.enabled === true ? "activé" : "désactivé"}`)
    let index = this.telerupteurs.indexOf(this.telerupteurs.find(t => t.id === oldObj.id))
    this.telerupteurs[index].enabled = newObj.enabled
  }
}
