import { VueComponent } from './vue/vue.component';
import { ReactComponent } from './react/react.component';
import { MfeViewComponent } from './mfe-view.component';
import { Routes } from '@angular/router';
export const MFE_VIEW_ROUTES: Routes = [
  {
    path: "",
    component: MfeViewComponent,
    children: [
      {
        path: "react_view",
        component: ReactComponent,
      },
      {
        path: 'vue_view',
        component: VueComponent,
      }
    ]
  },
]
