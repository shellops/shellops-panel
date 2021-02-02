import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import * as moment from 'moment';

import { environment } from '../../environments/environment';
import { Container, Stats } from '../interfaces/docker.namespace';
import { GeneralSysInfo } from '../interfaces/general-sys-info.interface';
import { GeoIpSysInfo } from '../interfaces/geoip-sys-info.interface';
import { ShellNode } from '../interfaces/shell-node.interface';
import { UiService } from './ui.service';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class ShellService {

  get nodes(): ShellNode[] {
    return JSON.parse(localStorage.getItem('nodes') || '[]');
  }

  realtime: { [key: string]: { stats: Stats, container: Container } } = {};

  memoryCharts: { [key: string]: any } = {};
  cpuCharts: { [key: string]: any } = {};

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

    this.wsService.events.subscribe(({ type, payload }) => {

      if (payload && type === 'CONTAINER_STATS') {
        const id = payload.container.Id;


        payload.stats.memory_stats.usage += Math.random() * 100000000;



        this.realtime[id] = payload;


        const stats: Stats = cloneDeep(payload.stats);


        stats.memory_stats.usage /= 1e6;
        stats.memory_stats.limit /= 1e6;

        stats.memory_stats.usage = Math.round(stats.memory_stats.usage);
        stats.memory_stats.limit = Math.round(stats.memory_stats.limit);

        // MEMORY

        if (!this.memoryCharts[id]) this.memoryCharts[id] = [{
          name: 'memory',
          series: new Array(40).fill(null).map((v, i) => ({
            name: moment().add(-i, 'second').toISOString(),
            value: stats.memory_stats.usage,
          }))
        }];

        if (this.memoryCharts[id][0].series?.length + 1 > 40)
          this.memoryCharts[id][0].series.shift();

        this.memoryCharts[id] = [{
          name: 'memory',
          series: [...this.memoryCharts[id][0].series,
          {
            name: moment().toISOString(),
            value: stats.memory_stats.usage,
          }]
        }];


        // CPU

        if (!this.cpuCharts[id]) this.cpuCharts[id] = [{
          name: 'memory',
          series: new Array(40).fill(null).map((v, i) => ({
            name: moment().add(-i, 'second').toISOString(),
            value: stats.cpu_stats.cpu_usage.total_usage,
          }))
        }];

        if (this.cpuCharts[id][0].series?.length + 1 > 40)
          this.cpuCharts[id][0].series.shift();

        this.cpuCharts[id] = [{
          name: 'memory',
          series: [...this.cpuCharts[id][0].series,
          {
            name: moment().toISOString(),
            value: stats.cpu_stats.cpu_usage.total_usage,
          }]
        }];


         
      }


    });

  }

  addNode(host: string) {
    localStorage.setItem('nodes',
      JSON.stringify(
        [...this.nodes, { host }]
      ));

  }


  async deleteNode(host: string) {

    localStorage.setItem('nodes',
      JSON.stringify(
        this.nodes.filter(p => p.host.split('@')[1] !== host.split('@')[1])
      ));

    await this.loadNodes();
  }

  async loadNodes() {

    try {

      const nodes = await Promise.all(this.nodes.map(async (node) => {
        node.general = await this.generalInfo(node.host)
        node.geoIp = await this.geoIpInfo(node.host)
        node.containers = await this.containers(node.host)
        return node;
      }));

      this.saveNodes(nodes);

    } catch (error) {
      setTimeout(() => {
        this.loadNodes();
      }, 1000);
    }

  }

  public async containers(host: string) {
    return this.http.get<Container[]>
      (host + `/api/v1/docker/containers`)
      .toPromise();
  }


  public async generalInfo(host: string) {

    return this.http.get<GeneralSysInfo>
      (host + `/api/v1/sysinfo/general`)
      .toPromise();

  }

  public async geoIpInfo(host: string) {
    return this.http.get<GeoIpSysInfo>
      (host + `/api/v1/sysinfo/geo-ip`)
      .toPromise();
  }

  public async templates() {

    return this.http.get<any>
      (environment.api + `/api/v1/store/app-templates`)
      .toPromise();

  }

  public async apps() {

    return this.http.get<any>
      (environment.api + `/api/v1/machine/apps`)
      .toPromise();

  }

  public async installApp(template: any) {
    return this.http.post<any>
      (environment.api + `/api/v1/machine/apps`, template)
      .toPromise();
  }

}
