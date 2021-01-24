import { Component, Input, OnInit } from '@angular/core';

import { ShellNode } from '../../../interfaces/shell-node.interface';
import { ShellService } from '../../../shared/shell.service';

@Component({
  selector: 'app-node-docker',
  templateUrl: './node-docker.component.html',
  styleUrls: ['./node-docker.component.scss']
})
export class NodeDockerComponent implements OnInit {

  @Input()
  model: ShellNode;

  constructor(public readonly shellService: ShellService) { }

  ngOnInit(): void { 
  }
  
  async installDocker(){
    await this.shellService.installDocker(this.model.host);
  }

  async uninstallDocker(){
    await this.shellService.uninstallDocker(this.model.host);
  }

}
