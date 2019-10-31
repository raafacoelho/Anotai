import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComandaComponent } from './comanda.component';

describe('ComandaComponent', () => {
  let component: ComandaComponent;
  let fixture: ComponentFixture<ComandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComandaComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
