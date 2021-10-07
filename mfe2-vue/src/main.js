import Vue from 'vue'
import App from './App.vue'

export class MfeVue extends HTMLElement {
    constructor(){
        super()
    }

    connectedCallback() {
        new Vue(App).$mount(this);
    }
}

customElements.define('vue-element', MfeVue);