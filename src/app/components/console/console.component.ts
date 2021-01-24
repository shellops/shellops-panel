import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShellNode } from '../../interfaces/shell-node.interface';
import { WsPayload } from '../../interfaces/ws-payload.interface';
import { WsService } from '../../shared/ws.service';


interface ConsoleCommand {
  command: string,
  logs: {
    date: Date,
    output: string,
    type: 'info' | 'error'
  }[],
}

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit, OnDestroy {


  @Input()
  model: ShellNode;
  
  wsSub: Subscription;

  history: ConsoleCommand[] = [];

  current: ConsoleCommand;

  constructor(private readonly wsService: WsService) { }


  ngOnInit(): void {

    this.wsSub = this.wsService.events.subscribe((next: WsPayload) => {

      // if (this.host && this.host === next.data.host) return;

      if (this.current?.command !== next.data.command) {

        if (this.current?.command)
          this.history.push(this.current);

        this.current = {
          command: next.data.command,
          logs: []
        };
      }

      if (next.data.error)
        this.current.logs.push({
          type: 'error',
          date: new Date(),
          output: next.data.error
        });

      if (next.data.output)
        this.current.logs.push({
          type: 'info',
          date: new Date(),
          output: next.data.output
        });



    });

  }

  ngOnDestroy(): void {
    this.wsSub?.unsubscribe();
  }

}
