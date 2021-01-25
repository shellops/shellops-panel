import { Component } from '@angular/core';

import { ShellService } from './shared/shell.service';
import { UiService } from './shared/ui.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public readonly shellService: ShellService, public readonly uiService: UiService) { }

}
