import React from "react";
import ReactDOM from "react-dom";
import { Home } from './src/components/home/home';


const App = () => {
  return (
    <div className="container py-5">
      <Home />
    </div>
  )
}

class Mfe4Element extends HTMLElement {

  constructor() {
    super()
  }

  connectedCallback() {
    ReactDOM.render(<App/>, this);
  }
}

customElements.define("react-element", Mfe4Element);
