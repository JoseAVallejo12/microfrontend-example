import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prosumidores',
  templateUrl: './prosumidores.component.html',
  styleUrls: ['./prosumidores.component.scss'],
})
export class ProsumidoresComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.navigate(['clientes'], { relativeTo: this.activatedRoute });
  }

  ngOnInit(): void {}
}
