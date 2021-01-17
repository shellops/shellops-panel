import { Component, Input, OnInit } from '@angular/core';
import { pick } from 'lodash';
import { ShellNode } from '../../interfaces/shell-node.interface';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  @Input()
  model: ShellNode;

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


  async ngOnInit() {
  }

}
