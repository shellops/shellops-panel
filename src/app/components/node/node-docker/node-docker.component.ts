import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShellNode } from '../../../interfaces/shell-node.interface';
import { ShellService } from '../../../shared/shell.service';

@Component({
  selector: 'app-node-docker',
  templateUrl: './node-docker.component.html',
  styleUrls: ['./node-docker.component.scss']
})
export class NodeDockerComponent implements OnInit {


  public get model(): ShellNode {
    return this.shellService.selectedNode;
  }

  templates = [];
  apps = []

  get containers() {

    const containers = this.model?.docker?.containers?.map(p => ({ ...p, installed: true })) || [];

    return containers;

  }

  getPublicPort(name: string, localPort: number) {
    return this.containers.find(p => p.name === name)?.ports.find(p => p.PrivatePort === localPort)?.PublicPort
  }

  constructor(public readonly shellService: ShellService, private readonly router: Router) { }

  async ngOnInit() {
    this.templates = await this.shellService.templates();
  }

  async installApp(template) {

    await this.shellService.installApp(template);

  }

}
