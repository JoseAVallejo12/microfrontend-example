import { shareNgZone } from '@angular-architects/module-federation-tools';
import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(private ngZone: NgZone) {
    shareNgZone(ngZone);
  }

  ngOnInit(): void {

  }
}
