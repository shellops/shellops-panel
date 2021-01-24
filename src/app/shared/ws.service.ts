import { EventEmitter, Injectable } from '@angular/core';

import { WsPayload } from '../interfaces/ws-payload.interface';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  events = new EventEmitter<WsPayload>();

  constructor() {

    this.initSocket();

  }

  initSocket() {

    const ws = new WebSocket('ws://localhost:3000');

    ws.onerror = (ev) => {
      setTimeout(() => {
        this.initSocket();
      }, 1500);
    }

    ws.onopen = (ev) => {

      console.log('socket open', ev);

      ws.onclose = () => {
        setTimeout(() => {
          this.initSocket();
        }, 1500);
      };

      ws.onmessage = (msg) => {
        const payload = JSON.parse(msg.data);
        this.events.emit(payload);
      };

    };


  }

}
