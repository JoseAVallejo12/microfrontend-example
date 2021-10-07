import { WebComponentWrapperOptions } from './../wrapper-modules/wrapper-modules.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  itemReact: WebComponentWrapperOptions = {
    remoteEntry: 'http://localhost:4204/remoteEntry.js',
    remoteName: 'react',
    exposedModule: './web-components',
    elementName: 'react-element',
  };
  itemVue: WebComponentWrapperOptions = {
    remoteEntry: 'http://localhost:4205/remoteEntry.js',
    remoteName: 'vue',
    exposedModule: './web-components',
    elementName: 'vue-element',
  };
  itemAngular: WebComponentWrapperOptions = {
    remoteEntry: 'http://localhost:4203/remoteEntry.js',
    remoteName: 'mfe3_angular',
    exposedModule: './web-components',
    elementName: 'angular1-element',
  };

  constructor() {
  }

  ngOnInit(): void {

  }
}
