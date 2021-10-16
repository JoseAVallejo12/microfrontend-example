# Microfronted React

Microfrontend desarrollado en React. Expone un web component que puede ser instanciado en una definicion vertical u horizontal de la aplicacion, dependiendo de su uso.

## Instalación

1. Clonar proyecto `git clone [repo url]`
2. Ir a la carpeta del proyecto `cd mfe1-react`.
3. Instalar las dependencias `npm install`.
4. Correr el ambiente local `npm run start`.

## Dependencias y plugins importantes

- [Module Federation](https://webpack.js.org/concepts/module-federation/) - Plugin de webpack que permite importar código dinámicamente
- [Windowed-observable](https://www.npmjs.com/package/windowed-observable) - Libreria de mensajería usando un pub / sub observable.

## Configuración y uso

- Module Federation

  En el archivo `webpack.config.js` importamos el plugin ModuleFederation,

  ```js
  const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
  ```

  y lo instanciamos en `plugins`

  ```js
  plugins: [
    new ModuleFederationPlugin({
      name: "react",
      library: { type: "var", name: "react" },
      filename: "remoteEntry.js",
      exposes: {
        "./web-components": "./app.js",
      },

      shared: ["react", "react-dom", 'crypto-js'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./*.html",
        },
      ],
    }),
  ],
  ```

  1. **name**: Nombre como identificador para acceder a la aplicación remotamente.
  2. **filename**: Nombre del archivo remoto.
  3. **exposes**: Expone cada componente que se desee.
  4. **shared**: Si el shell ya tiene estas librerias cargadas, no las cargara dos veces.

  Esta es la principal configuración para poder compartir las dependencias de este proyecto.

  En este caso la aplicacion y/o componente se exportara como Web Component para su respectiva importación en el Shell o en otro microfrontend, usando la siguiente configuracion en el `app.js`

  ```js
  class Mfe4Element extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      ReactDOM.render(<App />, this);
    }
  }

  customElements.define('react-element', Mfe4Element);
  ```

- Window observable

  Importamos la clase `Observable` del `windows-observable` donde se requiera usar.

  ```js
  import { Observable } from 'windowed-observable';
  ```

  Se instancia la clase para su respectivo uso.

  ```js
  const observable = new Observable('fromReact');
  ```

## Comunicación

Ya que la aplicación y/o componente se usa en definición horizontal y vertical, a traves de una condicion del path se valida que canal de comunicación usar para recibir y/o enviar los datos, ya sea suscribirse al observable del `windowed-observable` o escuchar un evento con el `addEventListener` y emitirlo con `dispatchEvent` globalmente a traves del windows.

- Enviar información

```js
if (path == '/') {
  let customEvent = new CustomEvent('submitRobot', {
    detail: {
      data: data,
    },
  });
  window.dispatchEvent(customEvent);
} else {
  observable.publish(data);
}
```

## Preview

![module federation](../img/mfe-react-preview.png)
