import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProsumidoresComponent } from './prosumidores/prosumidores.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'prosumidores',
    loadChildren: () =>
      import('./prosumidores/prosumidores.module').then(
        (m) => m.ProsumidoresModule
      ),
  },
];
@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [RouterModule.forRoot(routes), BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
