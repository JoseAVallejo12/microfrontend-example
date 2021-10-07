import { Component, OnInit } from '@angular/core';
import { Observable } from 'windowed-observable';

@Component({
  selector: 'app-vue',
  templateUrl: './vue.component.html',
  styleUrls: ['./vue.component.scss']
})
export class VueComponent implements OnInit {

  public selectedRobots:any;

  constructor() {
  }

  ngOnInit(): void {
    let observableVue = new Observable('fromVue');
    observableVue.subscribe((data) =>{
        this.selectedRobots = data;
    }, 
    { latest: true });
  }

}
