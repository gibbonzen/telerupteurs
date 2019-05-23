import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelerupteurComponent } from './telerupteur.component';

describe('TelerupteurComponent', () => {
  let component: TelerupteurComponent;
  let fixture: ComponentFixture<TelerupteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelerupteurComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelerupteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
