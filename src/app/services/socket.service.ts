import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

export interface SocketEvent {
  name: string,
  next: Function
}

interface Socket {
  route: string,
  socket: any
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private sockets: Socket[] = []

  constructor() { }

  connect(route: string, event: SocketEvent) {
    //console.log('Connection to ', route)

    if(!this.sockets.some(s => s.route === route)) {
      let socket = io.connect(route)

      socket.on(event.name, (o, n) => event.next(o, n))

      this.sockets.push({
        route: route,
        socket: socket
      })
    }
  }
  
  disconnect(route: string) {
    this.sockets.splice(this.sockets.indexOf(this.sockets.find(s => s.route === route)), 1)
  }

}
