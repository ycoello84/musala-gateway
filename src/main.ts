import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import {  provideRouter } from '@angular/router';
import { routes } from './app/app.routing';
import { GatewayService } from 'src/app/services/gateway.service';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    {provide: GatewayService, useClass: GatewayService},
  ] 
}).catch((err)=> console.log(err));

