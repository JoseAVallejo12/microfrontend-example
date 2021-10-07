import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mfe-view',
  templateUrl: './mfe-view.component.html',
  styleUrls: ['./mfe-view.component.scss']
})
export class MfeViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ){ }

  ngOnInit(): void {
    this.router.navigate(['/angular/vue_view'])
  }

  goTo(estado:string){
      if(estado == 'react'){
        this.router.navigate(['/angular/react_view'])
      }else{
        this.router.navigate(['/angular/vue_view'])
      }
  }

}
