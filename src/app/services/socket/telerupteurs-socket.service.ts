import { Injectable } from '@angular/core';
import { PreferencesService } from '../preferences.service';
import { Config } from '../../app.config';
import { SocketService } from './socket.service';
import { WebsocketService } from './websocket.service';
import { Telerupteur } from '../../model/telerupteur.model';

@Injectable({
  providedIn: 'root'
})
export class TelerupteursSocketService {

  private URL = () => this.preferences.getString(this.config.SOCKET_URL)

  constructor(private preferences: PreferencesService,
    private config: Config,
    private socketService: SocketService,
    private wsService: WebsocketService) { }

  connect(next: Function) {
    //this.socketService.onEvent('connect', () => this.onConnect(next))
    //this.socketService.connect(this.URL())

    this.wsService.onEvent('connect', () => this.onConnect(next))
    this.wsService.connect("ws://localhost:81")
  }

  private onConnect(next: Function) {
    console.log("Socket is connected")
    next()
  }
  
  onChange(next: Function) {
    this.socketService.onEvent('change', ([data]) => this.onChangeEvent(next, data))
    this.wsService.onEvent('message', (data: Telerupteur[]) => this.onChangeEvent(next, data))
  }

  private onChangeEvent(next: Function, data: Telerupteur[]) {
    next(data[0])
  }

}