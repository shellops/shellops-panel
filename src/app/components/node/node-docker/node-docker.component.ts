import { Component, Input, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
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


  apps = [
    {
      name: 'Poste',
      description: 'Self hosted Mailserver',
      icon: 'mail-bulk',
      showLogo: false,
      install: async()=>{
        this.router.navigate(['/nodes', this.model.host, 'console'])
        await this.shellService.installPoste(this.model.host);
        await this.shellService.loadNodes();
        setTimeout(() => {
          this.router.navigate(['/nodes', this.model.host, 'docker'])
        }, 3000);
      }
    },
    {
      name: 'Traefik',
      description: 'Reverse proxy for docker to provide multi domain binding',
      icon: 'network-wired',
      showLogo: true
    },
    {
      name: 'MongoDB',
      description: 'NoSQL database',
      icon: 'coins',
      showLogo: true
    }
  ]

  get containers() {

    const containers = this.model?.docker?.containers?.map(p => ({ ...p, installed: true })) || [];

    this.apps.forEach(app => {
      const container = containers.find(p => p.name?.toLowerCase() === app.name.toLowerCase());
      if (container)
        Object.assign(container, app);
      else
        containers.push({ ...app, installed: false })
    });

    return containers;

  }

  constructor(public readonly shellService: ShellService, private readonly router: Router) { }

  ngOnInit(): void { }

  async installDocker() {
    this.router.navigate(['/nodes', this.model.host, 'console'])
    await this.shellService.installDocker(this.model.host);
    await this.shellService.loadNodes();;
    this.router.navigate(['/nodes', this.model.host, 'docker'])
  }

  async uninstallDocker() {
    this.router.navigate(['/nodes', this.model.host, 'console'])
    await this.shellService.uninstallDocker(this.model.host);
    await this.shellService.loadNodes();;
    this.router.navigate(['/nodes', this.model.host, 'docker'])
  }

}
