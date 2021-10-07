import { MFE_VIEW_ROUTES } from './mfe.routes';
import { RouterModule } from '@angular/router';
import { VueComponent } from './vue/vue.component';
import { ReactComponent } from './react/react.component';
import { MfeViewComponent } from './mfe-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    MfeViewComponent,
    ReactComponent,
    VueComponent
  ],
  imports: [
    RouterModule.forChild(MFE_VIEW_ROUTES),
    CommonModule
  ]
})
export class MfeModule {}
