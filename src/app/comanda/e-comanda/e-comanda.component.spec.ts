import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EComandaComponent } from './e-comanda.component';

describe('EComandaComponent', () => {
  let component: EComandaComponent;
  let fixture: ComponentFixture<EComandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EComandaComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EComandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
