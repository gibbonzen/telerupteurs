import { Injectable } from '@angular/core';
import { Telerupteur } from '../model/telerupteur.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TelerupteurService {

  private baseUrl: string = 'http://localhost:8081/telerupteurs'
  private telerupteurs: Telerupteur[]

  constructor(private http: HttpClient) { }

  loadTelerupteurs() {
    this.http.get<Telerupteur[]>(`${this.baseUrl}`).subscribe((data: Telerupteur[]) => this.telerupteurs = data)
  }

  getTelerupteurs(): Telerupteur[] {
    if(!this.telerupteurs) this.loadTelerupteurs()
    return this.telerupteurs
  }

  getEtat(telerupteur: Telerupteur, next) {
    this.http.get(`${this.baseUrl}/${telerupteur.id}`).subscribe(data => next())
  }

  enable(telerupteur: Telerupteur) {
    this.http.post(`${this.baseUrl}/${telerupteur.id}`, undefined).subscribe()
  }

  updateTelerupteur(telerupteur: Telerupteur) {
    this.http.post(`${this.baseUrl}/${telerupteur.id}`, telerupteur).subscribe()
  }

}
