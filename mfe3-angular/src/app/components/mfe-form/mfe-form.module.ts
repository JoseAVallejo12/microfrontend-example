import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeFormViewComponent } from './view/view.component';
import { MfeFormComponent } from './mfe-form.component';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MfeFormComponent,
    MfeFormViewComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ]
})
export class MfeFormModule {
  constructor(private injector: Injector) {}
  
  ngDoBootstrap() {
    const ce = createCustomElement(MfeFormComponent, {injector: this.injector});
    customElements.define('angular1-element', ce);
  }
}
