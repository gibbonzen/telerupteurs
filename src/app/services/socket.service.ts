import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

export interface SocketEvent {
  name: string,
  next: Function
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }

  connect(url: string, event: SocketEvent) {
    let socket = io.connect(url)

    socket.on(event.name, (o, n) => event.next(o, n))
  }
}
