import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { EventEmitter } from 'events';

export interface SocketEvent {
  name: string,
  next: Function
}

@Injectable({
  providedIn: 'root'
})
export class SocketService extends EventEmitter {

  private route: string
  private connected: boolean = false
  private socket

  constructor() {
    super()
  }

  getSocket() {
    return this.socket
  }

  connect(route: string) {
    if(!route || route == null) return

    let socket = this.getSocket()
    if(socket) return socket

    console.log("Try connect to ", route)
    let ioSocket = io.connect(route)

    ioSocket.on('connect_error', err => {
      ioSocket.disconnect()
    })

    ioSocket.on('connect', (msg: string) => {
      console.log('Connection with socket is established...', msg)
      super.emit('connect', msg)
    })

    ioSocket.on('change', (... args: any[]) => super.emit('change', args))
  }
  
  disconnect(route: string) {
    let socket = this.getSocket()
    if(socket) {
      socket.socket.disconnect()
      this.socket = null
    }
  }

  isConnected() {
    return this.connected
  }

  onEvent(event: string, next: Function) {
    super.addListener(event, (... args: any[]) => next(args))
  }

}
