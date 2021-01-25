import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShellNode } from '../../../interfaces/shell-node.interface';
import { ShellService } from '../../../shared/shell.service';

@Component({
  selector: 'app-node-poste',
  templateUrl: './node-poste.component.html',
  styleUrls: ['./node-poste.component.scss']
})
export class NodePosteComponent implements OnInit {

  @Input()
  model: ShellNode;


  get poste() {
    return this.model.docker.containers.find(p => p.name === 'poste')
  }

  constructor(public readonly shellService: ShellService,
    private readonly router: Router) { }

  ngOnInit(): void { }

  async installPoste() {
    this.router.navigate(['/nodes', this.model.host, 'console'])
    await this.shellService.installPoste(this.model.host);
    await this.shellService.loadNodes();;
    this.router.navigate(['/nodes', this.model.host, 'mail'])

  }

  async uninstallPoste() {

  }



}
