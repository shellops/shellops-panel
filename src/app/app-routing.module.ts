import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NodeDockerComponent } from './components/node/node-docker/node-docker.component';
import { NodeInfoComponent } from './components/node/node-info/node-info.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { StartComponent } from './pages/start/start.component';

const routes: Routes = [
  {
    component: StartComponent,
    path: ''
  },
  {
    component: NodeInfoComponent,
    path: 'nodes/:host/info'
  },
  {
    component: NodeDockerComponent,
    path: 'nodes/:host/docker'
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
