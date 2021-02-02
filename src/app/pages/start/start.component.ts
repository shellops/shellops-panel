import { Component, OnInit } from '@angular/core';

import { ShellService } from '../../shared/shell.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(public readonly shellService: ShellService) { }

  ngOnInit(): void {
  }

}
