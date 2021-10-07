import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'windowed-observable'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
  ) {
  }

  async ngOnInit(): Promise<void> {
    let observableReact = new Observable('fromReact');
    observableReact.subscribe((data) =>{
      let path = window.location.pathname;
      if(path == '/react'){
        this.router.navigate(['/vue']);
      }
    }, 
    { latest: true });

    let observableVue = new Observable('fromVue');
    observableVue.subscribe((data) =>{
      let path = window.location.pathname;
      if(path == '/vue'){
        this.router.navigate(['/angular']);
      }
    }, 
    { latest: true });
  }

}
