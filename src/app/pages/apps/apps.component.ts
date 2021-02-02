import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShellNode } from '../../interfaces/shell-node.interface';
import { ShellService } from '../../shared/shell.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {


  public get model(): ShellNode {
    return this.shellService.selectedNode;
  }

  templates = [];
  containers = [];
  apps = []

  getPublicPort(name: string, localPort: number) {
    return this.containers.find(p => p.name === name)?.ports.find(p => p.PrivatePort === localPort)?.PublicPort
  }

  constructor(public readonly shellService: ShellService, private readonly router: Router) { }

  async ngOnInit() {
    this.apps = await this.shellService.apps();
    
    this.containers = this.shellService.selectedNode.docker.containers.map((container)=>{

      container.app = this.apps.find(p=>p.container === container.name);

      return container;
    });

  }
  async removeContainer(container){

  }
  async installApp(template) {

    await this.shellService.installApp(template);

  }


  async uninstallApp(appId) {

  }

}
