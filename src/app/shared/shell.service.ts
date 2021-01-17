import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GeneralSysInfo } from '../interfaces/general-sys-info.interface';
import { GeoIpSysInfo } from '../interfaces/geoip-sys-info.interface';
import { ShellNode } from '../interfaces/shell-node.interface';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class ShellService {

  public nodes: ShellNode[];

  constructor(
    private readonly wsService: WsService,
    private readonly http: HttpClient) {

    this.loadNodes();
    this.subscribeToWs();

  }

  get selectedNode() {
    return this.nodes?.find(p => p.selected)
  }

  async subscribeToWs() {

    this.wsService.events.subscribe((next) => {

      console.log(next);

    });

  }

  async loadNodes() {

    try {

      this.nodes = [{ host: 'localhost', selected: true }, ... await this.http.get<any>(environment.api + '/api/v1/nodes').toPromise()];

      this.nodes.forEach(async (node) => {
        node.general = await this.generalInfo(node.host)
        node.geoIp = await this.geoIpInfo(node.host)
      });

    } catch (error) {
      setTimeout(() => {
        this.loadNodes();
      }, 1000);
    }

  }

  selectNode(host: string) {
    if (this.nodes.find(p => p.host === host)) {
      this.nodes.forEach(node => node.selected = false);
      this.nodes.find(p => p.host === host).selected = true;
    }
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
