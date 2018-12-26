/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Navtree02Component } from './navtree02.component';

describe('Navtree02Component', () => {
  let component: Navtree02Component;
  let fixture: ComponentFixture<Navtree02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Navtree02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Navtree02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
