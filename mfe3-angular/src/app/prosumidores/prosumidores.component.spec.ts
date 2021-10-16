import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumidoresComponent } from './prosumidores.component';

describe('ProsumidoresComponent', () => {
  let component: ProsumidoresComponent;
  let fixture: ComponentFixture<ProsumidoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumidoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsumidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
