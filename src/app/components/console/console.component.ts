import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShellNode } from '../../interfaces/shell-node.interface';
import { WsPayload } from '../../interfaces/ws-payload.interface';
import { WsService } from '../../shared/ws.service';
import * as AnsiConverter from "ansi-to-html";
import { DomSanitizer } from '@angular/platform-browser';
import { ShellService } from '../../shared/shell.service';

interface ConsoleCommand {
  command: string,
  logs: {
    raw: string,
    date: Date,
    output: string | any,
    type: string
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

  public get model(): ShellNode {
    return this.shellService.selectedNode;
  }

  wsSub: Subscription;

  history: ConsoleCommand[] = [];

  current: ConsoleCommand;

  constructor(
    private readonly shellService: ShellService,
    private readonly sanitizer: DomSanitizer,
    private readonly wsService: WsService) { }


  ngOnInit(): void {

    this.wsSub = this.wsService.events.subscribe((next: WsPayload) => {

      // if (this.host && this.host === next.data.host) return;

      if (this.current?.logs?.length && next.data.output === '\u001b')
        return;

      if (this.current?.command !== next.data.command) {

        if (this.current?.command)
          this.history.push(this.current);

        this.current = {
          command: next.data.command,
          logs: []
        };
      }

      const payload = {
        type: next.data.output ? 'info' : next.data.error ? 'error' : null,
        date: new Date(),
        raw: next.data.output || next.data.error,
        output: this.sanitizer.bypassSecurityTrustHtml(
          this.ansiCoverter.toHtml(next.data.output || next.data.error)
        )
      };

      if (this.current?.logs?.length && payload.raw.startsWith('\u001b'))
        Object.assign(this.current.logs[this.current.logs.length - 1], payload)
      else
        this.current.logs.push(payload);


      setTimeout(() => {
        this.consoleRef.nativeElement.scrollTo({
          top: this.consoleRef.nativeElement.scrollHeight
        })
      }, 100);

    });

  }

  ngOnDestroy(): void {
    this.wsSub?.unsubscribe();
  }

}
