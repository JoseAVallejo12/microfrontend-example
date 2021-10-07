import { Component, OnInit } from '@angular/core';
import { FormService } from './service/form.service';

@Component({
  selector: 'app-mfe-form',
  templateUrl: './mfe-form.component.html',
  styleUrls: ['./mfe-form.component.scss']
})
export class MfeFormComponent implements OnInit {

  constructor(
    private formService: FormService,
  ){ }

  ngOnInit(): void {
    this.formService.obtener().subscribe(sub => {console.log(sub)})
  }

}
