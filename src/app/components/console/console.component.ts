import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShellNode } from '../../interfaces/shell-node.interface';
import { WsPayload } from '../../interfaces/ws-payload.interface';
import { WsService } from '../../shared/ws.service';
import * as AnsiConverter from "ansi-to-html";
import { DomSanitizer } from '@angular/platform-browser';

interface ConsoleCommand {
  command: string,
  logs: {
    date: Date,
    output: string | any,
    type: 'info' | 'error'
  }[],
}

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit, OnDestroy {

  ansiCoverter = new AnsiConverter();

  @ViewChild('console') consoleRef: { nativeElement: HTMLElement };

  @Input()
  model: ShellNode;

  wsSub: Subscription;

  history: ConsoleCommand[] = [];

  current: ConsoleCommand;

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly wsService: WsService) { }


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
          output: this.sanitizer.bypassSecurityTrustHtml(
            this.ansiCoverter.toHtml(next.data.error)
          )
        });

      if (next.data.output)
        this.current.logs.push({
          type: 'info',
          date: new Date(),
          output: this.sanitizer.bypassSecurityTrustHtml(
            this.ansiCoverter.toHtml(next.data.output)
          )
        });

      this.consoleRef.nativeElement.scrollTo({
        top: this.consoleRef.nativeElement.scrollHeight + 100
      })

    });

  }

  ngOnDestroy(): void {
    this.wsSub?.unsubscribe();
  }

}
