import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsoleComponent } from './components/console/console.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { AppsComponent } from './pages/apps/apps.component';
import { InfoComponent } from './pages/info/info.component';
import { StartComponent } from './pages/start/start.component';
import { TemplatesComponent } from './pages/templates/templates.component';

const routes: Routes = [
  {
    component: StartComponent,
    path: ''
  },
  {
    component: InfoComponent,
    path: 'nodes/:host/info'
  },
  {
    component: AppsComponent,
    path: 'nodes/:host/apps'
  },
  {
    component: TemplatesComponent,
    path: 'nodes/:host/templates'
  },
  {
    component: ConsoleComponent,
    path: 'nodes/:host/console'
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
