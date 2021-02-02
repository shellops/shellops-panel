import { Component } from '@angular/core';
import { pick } from 'lodash';

import { ShellNode } from '../../interfaces/shell-node.interface';
import { ShellService } from '../../shared/shell.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent   {

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
