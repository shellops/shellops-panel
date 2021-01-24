import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {


  public newShell = {
    host: '',
    password: ''
  };

  constructor(private readonly http: HttpClient) {

  }
  ngOnInit(): void {
  }

  async addNewShell() {

    await this.http.post<any>(environment.api + '/api/v1/node', this.newShell).toPromise();

    // await this.loadNodes();

    this.newShell = {
      host: '',
      password: ''
    };
  }




}
