# Microfronted Shell

Shell del microfrontend desarrollado en Angular.
Este escenario orquesta la definicion vertical y horizontal de la aplicacion, dependiendo de su uso.

## Instalación

1. Clonar proyecto `git clone [repo url]`
2. Ir a la carpeta del proyecto `cd shell-microfrontend`.
3. Instalar las dependencias `npm install`.
4. Correr el ambiente local `npm run start`.

## Dependencias importantes

- [Angular Architecs / Module Federation](https://www.npmjs.com/package/@angular-architects/module-federation) - Plugin que permite auto configurar nuestra aplicacion para que Module Federation funcione junto a Angular y su CLI

## Configuración y uso

- Definición vertical: En este tipo de vista se tienen web componente y aplicaciones completas exportadas desde angular. Para su definicion se usa el angular router y cada microfrontend puede ser cargada usando el loadChildren o a traves de eventos de usuario o de sistema.

  - Se crea el archivo de rutas especificas para Angular
  - Se importa `loadRemoteModule` que se encarga de ejecutar internamente la carga del modulo remoto y la instanciación de este.

    ```ts
    import { loadRemoteModule } from "@angular-architects/module-federation";
    ```

    - Se crean las rutas para cada aplicación y/o componente remoto

    ```ts
    export const APP_ROUTES: Routes = [
      // component del shell
      {
        path: "",
        component: HomeComponent,
        pathMatch: "full",
      },
      // aplicacion exportada desde angular
      {
        path: "angular",
        loadChildren: () =>
          loadRemoteModule({
            remoteEntry: "http://localhost:4203/remoteEntry.js",
            remoteName: "mfe3_angular",
            exposedModule: "./Module",
          }).then((m) => m.MfeModule),
      },
      // web component exportado desde react
      {
        path: "react",
        component: WebComponentWrapper,
        data: {
          remoteEntry: "http://localhost:4204/remoteEntry.js",
          remoteName: "react",
          exposedModule: "./web-components",
          elementName: "react-element",
        } as WebComponentWrapperOptions,
      },
      // web component exportado desde vue
      {
        path: "vue",
        component: WebComponentWrapper,
        data: {
          remoteEntry: "http://localhost:4205/remoteEntry.js",
          remoteName: "vue",
          exposedModule: "./web-components",
          elementName: "vue-element",
        } as WebComponentWrapperOptions,
      },
      // pagina no encontrada 404
      {
        path: "**",
        component: HomeComponent,
      },
    ];
    ```

    El componente `WebComponentWrapper` recibe por medio de la data las siguientes opciones:

    - **remoteEntry**: Donde se encuentra alojado nuestro microfrontend
    - **remoteName**: Nombre remoto de la aplicación y/o componente definido en los microfrontend
    - **exposedModule**: Componente, modulo y/o aplicación expuesta definida en los microfrontend
    - **elementName**: Nombre del webcomponent creado en cada microfrontned

    las cuales declara como `WebComponentWrapperOptions`

    Adicionalmente para la ruta de Angular, se usa la funcion `loadRemoteModule` para cargar dinámicamente el microfrontend en tiempo de ejecución,

- Definición horizontal

  El `WebComponentWrapper` se usa como un componente tradicional, utilizando su respectivo selector, para eso:

  1. Se importa el modulo `ModuleFederationToolsModule`

  ```js
  import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { APP_ROUTES } from './app.routes';
  import { AppComponent } from './app.component';
  import { RouterModule } from '@angular/router';
  import { NavbarComponent } from './components/navbar/navbar.component';
  import { HomeComponent } from './components/home/home.component';
  import { CommonModule } from '@angular/common';
  import { ModuleFederationToolsModule } from '@angular-architects/module-federation-tools';

  @NgModule({
  declarations: [
      AppComponent,
      NavbarComponent,
      HomeComponent,
  ],
  imports: [
      BrowserModule,
      RouterModule.forRoot(APP_ROUTES),
      CommonModule,
      ModuleFederationToolsModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
  });

  export class AppModule { }

  ```

2. Se utiliza el selector `mft-wc-wrapper`, el cual recibe la propiedad `options` y 2 propiedades opcionales `props` y `events`

`component.html`

```html
<mft-wc-wrapper [options]="item" [props]="props" [events]="events">
</mft-wc-wrapper>
```

`component.ts`

```js
itemReact: WebComponentWrapperOptions = {
  remoteEntry: "http://localhost:4204/remoteEntry.js",
  remoteName: "react",
  exposedModule: "./web-components",
  elementName: "react-element",
};

props = {
  message: "Hello from Shell",
};

events = {
  clicked: (event) => {
    console.debug("clicked!", event);
  },
};
```

- **remoteEntry**: Donde se encuentra alojado nuestro microfrontend
- **remoteName**: Nombre remoto de la aplicación y/o componente definido en los microfrontend
- **exposedModule**: Componente, modulo y/o aplicación expuesta definida en los microfrontend
- **elementName**: Nombre del webcomponent creado en cada microfrontned

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
