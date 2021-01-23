import { Component, Input } from '@angular/core';

import { ShellNode } from '../../interfaces/shell-node.interface';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent   {

  @Input()
  model: ShellNode;
  
}
