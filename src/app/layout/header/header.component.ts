import { Component, OnInit } from '@angular/core';
import { ShellService } from '../../shared/shell.service';
import { UiService } from '../../shared/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public readonly uiService: UiService,
    public readonly shellService: ShellService) { }

  ngOnInit(): void {
  }

}
