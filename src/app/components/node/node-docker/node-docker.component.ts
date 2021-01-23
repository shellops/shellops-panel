import { Component, Input, OnInit } from '@angular/core';

import { ShellNode } from '../../../interfaces/shell-node.interface';

@Component({
  selector: 'app-node-docker',
  templateUrl: './node-docker.component.html',
  styleUrls: ['./node-docker.component.scss']
})
export class NodeDockerComponent implements OnInit {

  @Input()
  model: ShellNode;

  constructor() { }

  ngOnInit(): void { }

}
