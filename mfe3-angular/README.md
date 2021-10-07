# Microfronted Angular

Microfrontend desarrollado en Angular que exporta el modulo principal donde se definieron vistas y rutas, las cuales seran agregadas a las rutas principales del container o shell. En este ejemplo este escenario solo maneja la definicion vertical de la aplicación.

## Instalación

1. Clonar proyecto `git clone [azure repo url]`
2. Ir a la carpeta del proyecto `cd mfe3-angular`.
3. Instalar las dependencias `npm install`.
4. Correr el ambiente local `npm run start`.

## Dependencias y plugins importantes

- [Module Federation](https://webpack.js.org/concepts/module-federation/) - Plugin de webpack que permite importar código dinámicamente
- [Windowed-observable](https://www.npmjs.com/package/windowed-observable) - Libreria de mensajería usando un pub / sub observable.

## Configuración y uso

- Module Federation

  En el archivo `webpack.config.js` importamos el plugin ModuleFederation,

  ```js
  const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
  ```

  y lo instanciamos en `plugins`

  ```js
  plugins: [
      new ModuleFederationPlugin({
      name: "mfe3_angular",
      filename: "remoteEntry.js",
      exposes: {
          './Module': './src/app/components/mfe-view/mfe-view.module.ts',
      },
      shared: share({
              "@angular/core": {
              singleton: true,
              strictVersion: true,
              requiredVersion: "auto",
              },
              "@angular/common": {
              singleton: true,
              strictVersion: true,
              requiredVersion: "auto",
              },
              "@angular/common/http": {
              singleton: true,
              strictVersion: true,
              requiredVersion: "auto",
              },
              "@angular/router": {
              singleton: true,
              strictVersion: true,
              requiredVersion: "auto",
              },

              ...sharedMappings.getDescriptors(),
          }),
      }),
      sharedMappings.getPlugin(),
  ],
  ```

  1. **name**: Nombre como identificador para acceder a la aplicación remotamente.
  2. **filename**: Nombre del archivo remoto.
  3. **exposes**: Expone cada componente que se desee.
  4. **shared**: Si el shell ya tiene estas librerias cargadas, no las cargara dos veces.

  Esta es la principal configuración para poder compartir las dependencias de este proyecto.

  En este caso la aplicacion y/o componente se exportara como Módulo para su respectiva importación en el Shell.

- Window observable

  Importamos la clase `Observable` del `windows-observable` donde se requiera usar.

  ```js
  import { Observable } from "windowed-observable";
  ```

  Se instancia la clase para su respectivo uso.

  ```js
  let observableVue = new Observable("fromVue");
  let observableReact = new Observable("fromReact");
  ```

## Comunicación

Ya que la aplicación y/o componente se aplica solo en definición vertical, se usa el canal de comunicación `windowed-observable` para recibir y/o enviar los datos, ya sea suscribiendose al observable o publicar información a través del mismo.

- Recibir información

  ```js
  observableReact.subscribe(
    (data) => {
      this.formData = data;
    },
    { latest: true }
  );
  ```

  ```js
  observableVue.subscribe(
    (data) => {
      this.selectedRobots = data;
    },
    { latest: true }
  );
  ```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
