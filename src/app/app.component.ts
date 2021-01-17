import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { pick } from 'lodash';

import { SysInfo } from './interfaces/sysinfo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public general: {
    memories: SysInfo.MemLayoutData[],
    cpu: SysInfo.CpuData,
    system: SysInfo.SystemData,
    os: SysInfo.OsData,
    disks: SysInfo.DiskLayoutData,
    graphics: SysInfo.GraphicsData,
    networks: SysInfo.NetworkInterfacesData[],
    versions: SysInfo.VersionData
  };

  public geoIp: {
    city: string,
    country: string,
    countryCode: string,
    isp: string,
    lat: number,
    lon: number,
    ip: string
  };

  public newShell = {
    host: '',
    password: ''
  };



  nodes: any;

  constructor(private readonly http: HttpClient) {

  }

  async addNewShell() {

    await this.http.post<any>('http://localhost:3000' + '/api/v1/node', this.newShell).toPromise();

    await this.loadNodes();

    this.newShell = {
      host: '',
      password: ''
    };
  }

  async loadNodes() {
    this.nodes = await this.http.get<any>('http://localhost:3000' + '/api/v1/nodes').toPromise();
  }

  async ngOnInit() {


    // const ws = new WebSocket('ws://localhost:3000');

    // ws.onopen = (ev) => {

    //   console.log('socket open', ev);

    //   ws.send(JSON.stringify({ event: 'events' }));

    //   ws.onmessage = (msg) => {
    //     console.log('socket msg', msg);
    //   }

    // };

    await this.loadNodes();

    this.general = await this.http.get<any>('http://localhost:3000' + '/api/v1/sysinfo/localhost/general').toPromise();

    this.http.get<any>('http://localhost:3000' + '/api/v1/sysinfo/localhost/geo-ip')
      .toPromise().then(res => {
        this.geoIp = res;
      }).catch((e) => console.warn(e));


    this.general.versions = pick(this.general.versions,
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
      ].filter(p => this.general.versions[p]));

  }
}
