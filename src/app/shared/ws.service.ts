import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  events = new EventEmitter();

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
        console.log(payload.data?.host, payload.data?.output || payload.data?.error)
        this.events.emit(payload);
      };

    };


  }

}
