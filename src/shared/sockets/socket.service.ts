import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {
  }

  send(message) {
    this.socket.emit('msgToServer', message, (algo) => console.log('algo', algo));
  }

  receiveChat() {
    return this.socket.fromEvent('msgToClient');
  }

}
