import { Component, Input } from '@angular/core';
import { pick } from 'lodash';

import { ShellNode } from '../../../interfaces/shell-node.interface';
import { ShellService } from '../../../shared/shell.service';

@Component({
  selector: 'app-node-info',
  templateUrl: './node-info.component.html',
  styleUrls: ['./node-info.component.scss']
})
export class NodeInfoComponent {

  constructor(public readonly shellService: ShellService) { }

  public get model(): ShellNode {
    return this.shellService.selectedNode;
  }


  get appVersions() {
    return pick(this.model?.general?.versions || {},
      [
        'docker',
        'node',
        'npm',
        'mongodb',
        'redis',
        'mysql',
        'postgres',
        'nginx',
        'php',
        'apache',
        'java',
        'git',
        'virtualbox',
      ].filter(p => this.model?.general?.versions[p]));
  }

}
