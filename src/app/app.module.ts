import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NodeComponent } from './components/node/node.component';
import { HeaderComponent } from './layout/header/header.component';
import { LogoComponent } from './layout/logo/logo.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AccountComponent } from './pages/account/account.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { ConnectComponent } from './components/connect/connect.component';
import { MapComponent } from './components/map/map.component';
import { NodesComponent } from './components/nodes/nodes.component';
import { NodeInfoComponent } from './components/node/node-info/node-info.component';
import { LoadingComponent } from './layout/loading/loading.component';
import { NodeDockerComponent } from './components/node/node-docker/node-docker.component';
import { ConsoleComponent } from './components/console/console.component';
import { NodePosteComponent } from './components/node/node-poste/node-poste.component';
import { StartComponent } from './pages/start/start.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    HeaderComponent,
    LogoComponent,
    FooterComponent,
    AccountComponent,
    SignupComponent,
    SigninComponent,
    NodesComponent,
    ConnectComponent,
    MapComponent,
    NodeInfoComponent,
    LoadingComponent,
    NodeDockerComponent,
    ConsoleComponent,
    NodePosteComponent,
    StartComponent,
    NotFoundComponent,
  ],
  imports: [
    NgPipesModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
