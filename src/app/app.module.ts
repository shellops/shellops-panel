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
import { NodesComponent } from './pages/nodes/nodes.component';

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
  ],
  imports: [
    NgPipesModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
