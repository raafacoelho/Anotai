import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPgtoPage } from './forma-pgto.page';

describe('FormaPgtoPage', () => {
  let component: FormaPgtoPage;
  let fixture: ComponentFixture<FormaPgtoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormaPgtoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaPgtoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
