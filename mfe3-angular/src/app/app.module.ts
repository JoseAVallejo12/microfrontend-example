import { MfeModule } from './components/mfe-view/mfe-view.module';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MfeFormModule } from './components/mfe-form/mfe-form.module';

const routes: Routes = [
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MfeModule,
    MfeFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
