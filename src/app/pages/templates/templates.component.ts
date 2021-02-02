import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShellNode } from '../../interfaces/shell-node.interface';
import { ShellService } from '../../shared/shell.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {


  templates = []

  constructor(public readonly shellService: ShellService, private readonly router: Router) { }

  async ngOnInit() {
    this.templates = await this.shellService.templates();
   
    
  }

  async installApp(template) {

    await this.shellService.installApp(template);
    

  }


  async uninstallApp(appId) {

  }
}
