import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { pick } from 'lodash';
import { GeneralSysInfo } from './interfaces/general-sys-info.interface';
import { GeoIpSysInfo } from './interfaces/geoip-sys-info.interface';
import { ShellService } from './shared/shell.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public readonly shellService: ShellService) { }

}
