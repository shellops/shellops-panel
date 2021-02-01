import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ShellService } from '../../shared/shell.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {


  public newShell = {
    host: '',
  };

  constructor(private readonly http: HttpClient, private readonly shellService: ShellService) {

  }
  ngOnInit(): void {
  }

  async addNewShell() {

    this.shellService.addNode(this.newShell.host);
    
    await this.shellService.loadNodes();

    this.newShell = {
      host: '',
    };
  }




}
