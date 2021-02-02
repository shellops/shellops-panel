import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Container } from '../../interfaces/docker.namespace';

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
  containers: Container[] = [];
  apps = []

  memoryCharts = {}

  constructor(
    public readonly shellService: ShellService,
    private readonly changeRef: ChangeDetectorRef) {
    // setInterval(() => {
    //   this.memoryCharts = this.shellService.memoryCharts;
    //   this.changeRef.detectChanges();
    // }, 1000)
  }

  async ngOnInit() {
    this.apps = await this.shellService.apps();

    this.containers = this.shellService.selectedNode.containers.map((container) => {

      container.app = this.apps.find(p => '/' + p.container === container.Names[0]);

      return container;
    });

  }
  async removeContainer(container) {

  }
  async installApp(template) {

    await this.shellService.installApp(template);

  }


  async uninstallApp(appId) {

  }

}
