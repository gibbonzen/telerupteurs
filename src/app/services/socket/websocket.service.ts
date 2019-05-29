import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService extends EventEmitter {
  
  private socket

  constructor() { 
    super()
  }

  getSocket() {
    return this.socket
  }

  connect(wsURL: string) {
    if(!wsURL || wsURL == null) return
    
    let socket = this.getSocket()
    if(socket) return socket

    console.log("Try connect to ", wsURL)
    let ws = new WebSocket("ws://localhost:81")

    ws.onopen = e => {
      console.log('Connection with socket established...')
      super.emit('connect', "Connected to websocket")
    }

    ws.onerror = e => {
      console.log("Error on websocket")
      ws.close()
    }

    ws.onmessage = e => {
      let data = JSON.parse(e.data)
      super.emit(e.type, data)
    }
  }

  onEvent(event: string, next: Function) {
    super.addListener(event, (... data) => next(data))
  }

}
