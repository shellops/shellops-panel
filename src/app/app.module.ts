import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgPipesModule } from 'ngx-pipes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectComponent } from './components/connect/connect.component';
import { ConsoleComponent } from './components/console/console.component';
import { MapComponent } from './components/map/map.component';

import { NodesComponent } from './components/nodes/nodes.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoadingComponent } from './layout/loading/loading.component';
import { LogoComponent } from './layout/logo/logo.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { AccountComponent } from './pages/account/account.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StartComponent } from './pages/start/start.component';
import { InfoComponent } from './pages/info/info.component';
import { AppsComponent } from './pages/apps/apps.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { MdatePipe } from './mdate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoComponent,
    FooterComponent,
    AccountComponent,
    SignupComponent,
    SigninComponent,
    NodesComponent,
    ConnectComponent,
    MapComponent,
    LoadingComponent,
    ConsoleComponent,
    StartComponent,
    NotFoundComponent,
    InfoComponent,
    AppsComponent,
    TemplatesComponent,
    MdatePipe,
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
