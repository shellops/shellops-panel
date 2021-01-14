import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SysInfo } from './interfaces/sysinfo'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public general: {
    memory: SysInfo.MemLayoutData[],
    cpu: SysInfo.CpuData,
    system: SysInfo.SystemData,
    os: SysInfo.OsData,
    disk: SysInfo.DiskLayoutData,
    graphics: SysInfo.GraphicsData,
    network: SysInfo.NetworkInterfacesData,
    versions: SysInfo.VersionData
  }

  constructor(private readonly http: HttpClient) {

  }

  async ngOnInit() {

    this.general = await this.http.get<any>('http://localhost:3000' + '/api/v1/sysinfo/local/general').toPromise();

  }
}
