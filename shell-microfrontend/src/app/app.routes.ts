import { WebComponentWrapper } from './components/wrapper-modules/wrapper-modules.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'angular',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        remoteName: 'mfe3_angular',
        exposedModule: './Module',
      }).then((m) => m.MfeModule),
  },
  {
    path: 'react',
    component: WebComponentWrapper,
    data: {
      remoteEntry: 'http://localhost:4204/remoteEntry.js',
      remoteName: 'react',
      exposedModule: './web-components',
      elementName: 'react-element',
    } as WebComponentWrapperOptions,
  },
  {
    path: 'vue',
    component: WebComponentWrapper,
    data: {
      remoteEntry:
        'http://localhost:4205/remoteEntry.js',
      remoteName: 'vue',
      exposedModule: './web-components',
      elementName: 'vue-element',
    } as WebComponentWrapperOptions,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
