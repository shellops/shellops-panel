import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ShellNode } from '../../interfaces/shell-node.interface';
import { ShellService } from '../../shared/shell.service';
import { WsService } from '../../shared/ws.service';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss']
})
export class NodesComponent {

  constructor(
    public readonly shellService: ShellService) { }


}
