import { Component, OnInit } from '@angular/core';
import { Observable } from 'windowed-observable';

@Component({
  selector: 'app-react',
  templateUrl: './react.component.html',
  styleUrls: ['./react.component.scss']
})
export class ReactComponent implements OnInit {

  public formData:any= null;

  constructor() { 
  }

  ngOnInit(): void {
    let observableReact = new Observable('fromReact');
    observableReact.subscribe((data) =>{
        this.formData = data;
    }, 
    { latest: true });
  }

}
