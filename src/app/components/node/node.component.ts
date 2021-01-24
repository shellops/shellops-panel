import { Component, Input } from '@angular/core';

import { ShellNode } from '../../interfaces/shell-node.interface';
import { ShellService } from '../../shared/shell.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent {

  constructor(public readonly shellService: ShellService) { }

  @Input()
  model: ShellNode;

}
