import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShellNode } from '../../interfaces/shell-node.interface';
import { WsPayload } from '../../interfaces/ws-payload.interface';
import { WsService } from '../../shared/ws.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ShellService } from '../../shared/shell.service';
import { Terminal } from 'xterm';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements AfterViewInit, OnDestroy {

  @ViewChild('terminal') terminalRef: { nativeElement: HTMLElement };

  public get model(): ShellNode {
    return this.shellService.selectedNode;
  }

  wsSub: Subscription;

  constructor(
    private readonly shellService: ShellService,
    private readonly wsService: WsService) { }


  async ngAfterViewInit() {

    const terminal = new Terminal({

    });

    terminal.open(this.terminalRef.nativeElement);

    this.wsSub = this.wsService.events.subscribe((next: WsPayload) => {

      const chunk = next.data.output || next.data.error;

      terminal.write(chunk);

      localStorage.setItem('terminal_history', JSON.stringify([
        ...(JSON.parse(localStorage.getItem('terminal_history') || '[]')),
        chunk
      ]));

    });

  }

  ngOnDestroy() {
    this.wsSub?.unsubscribe();
  }

}
