import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { GeneralSysInfo } from '../interfaces/general-sys-info.interface';
import { GeoIpSysInfo } from '../interfaces/geoip-sys-info.interface';
import { ShellNode } from '../interfaces/shell-node.interface';
import { UiService } from './ui.service';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class ShellService {
  
  get nodes(): ShellNode[]{
    return JSON.parse(localStorage.getItem('nodes') || '[]');
  }

  constructor(
    private readonly uiService: UiService,
    private readonly wsService: WsService,
    private readonly http: HttpClient) {
    this.loadNodes();
    this.subscribeToWs();
  }

  saveNodes(nodes) {
    localStorage.setItem('nodes', JSON.stringify(nodes));
  }

  get selectedNode() {
    return this.nodes?.find(p => p.host.split('@')[1].split(':')[0] === this.uiService.params?.host)
  }

  async subscribeToWs() {

    this.wsService.events.subscribe((next) => {


    });

  }

  addNode(host: string) {
    localStorage.setItem('nodes',
     JSON.stringify(
       [...this.nodes, {host}]
      ));

  }


  async deleteNode(host: string) {

    localStorage.setItem('nodes',
    JSON.stringify(
      this.nodes.filter(p=> p.host.split('@')[1] !== host.split('@')[1])
     ));

    await this.loadNodes();
  }

  async loadNodes() {

    try {

      const nodes = await Promise.all( this.nodes.map(async (node) => {
        node.general = await this.generalInfo(node.host)
        node.geoIp = await this.geoIpInfo(node.host)
        node.docker = await this.docker(node.host)
        return node;
      }));

      this.saveNodes(nodes);

    } catch (error) {
      setTimeout(() => {
        this.loadNodes();
      }, 1000);
    }

  }

  public async docker(host: string) {
    return this.http.get<GeneralSysInfo>
      (host +`/api/v1/sysinfo/docker`)
      .toPromise();
  }
  

  public async generalInfo(host: string) {

    return this.http.get<GeneralSysInfo>
      (host +`/api/v1/sysinfo/general`)
      .toPromise();

  }

  public async geoIpInfo(host: string) {
    return this.http.get<GeoIpSysInfo>
      (host +`/api/v1/sysinfo/geo-ip`)
      .toPromise();
  }

  public async templates() {

    return this.http.get<any>
      (environment.api + `/api/v1/store/app-templates`)
      .toPromise();

  }

  public async  installApp(template: any) {
    return this.http.post<any>
      (environment.api + `/api/v1/machine/apps`,template)
      .toPromise();
  }

}
