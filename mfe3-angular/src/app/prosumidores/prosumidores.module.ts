import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ProsumidoresComponent } from './prosumidores.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { CobrosComponent } from './cobros/cobros.component';

const routes: Routes = [
  {
    path: '',
    component: ProsumidoresComponent,
    children: [
      {
        path: 'clientes',
        component: ClientesComponent,
      },
      {
        path: 'cobros',
        component: CobrosComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [ProsumidoresComponent, ClientesComponent, CobrosComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ProsumidoresModule {}
