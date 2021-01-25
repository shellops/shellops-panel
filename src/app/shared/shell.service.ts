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

  public nodes: ShellNode[];

  constructor(
    private readonly uiService: UiService,
    private readonly wsService: WsService,
    private readonly http: HttpClient) {
    this.loadNodes();
    this.subscribeToWs();
  }

  saveNodes() {
    localStorage.setItem('nodes', JSON.stringify(this.nodes));
  }

  get selectedNode() {
    return this.nodes?.find(p => p.host && p.host === this.uiService.params?.host)
  }

  async subscribeToWs() {

    this.wsService.events.subscribe((next) => {


    });

  }

  async deleteNode(host: string) {
    await this.http.delete<ShellNode[]>(environment.api + '/api/v1/nodes/' + host).toPromise();
    await this.loadNodes();
  }

  async loadNodes() {

    this.nodes = this.nodes || JSON.parse(localStorage.getItem('nodes') || '[]');

    try {

      const newList = await this.http.get<ShellNode[]>(environment.api + '/api/v1/nodes').toPromise();
      if (!this.nodes?.length)
        this.nodes = newList;
      else
        this.nodes.forEach((node, i) => {
          const existing = newList.find(p => p.host === node.host);
          if (existing)
            Object.assign(node, existing);
          else
            this.nodes[i] = null;
        });


      this.nodes.concat(newList.filter(n => !this.nodes.find(p => p.host === n.host)));

      this.nodes = this.nodes.filter(p => p);

      this.nodes.forEach(async (node) => {
        node.general = await this.generalInfo(node.host)
        node.geoIp = await this.geoIpInfo(node.host)
        node.docker = await this.docker(node.host)
      });


      this.saveNodes();

    } catch (error) {
      setTimeout(() => {
        this.loadNodes();
      }, 1000);
    }

  }

  public async docker(host: string) {
    return this.http.get<GeneralSysInfo>
      (environment.api + `/api/v1/sysinfo/${host}/docker`)
      .toPromise();
  }

  public async installDocker(host: string) {

    return this.http.post
      (environment.api + `/api/v1/shell/${host}/docker`, {})
      .toPromise();

  }

  public async installPoste(host: string) {

    return this.http.post
      (environment.api + `/api/v1/shell/${host}/poste`, {})
      .toPromise();

  }


  public async uninstallDocker(host: string) {

    await this.http.delete
      (environment.api + `/api/v1/shell/${host}/docker`, {})
      .toPromise();

    await this.loadNodes();

  }


  public async generalInfo(host: string) {

    return this.http.get<GeneralSysInfo>
      (environment.api + `/api/v1/sysinfo/${host}/general`)
      .toPromise();

  }

  public async geoIpInfo(host: string) {
    return this.http.get<GeoIpSysInfo>
      (environment.api + `/api/v1/sysinfo/${host}/geo-ip`)
      .toPromise();
  }

}
