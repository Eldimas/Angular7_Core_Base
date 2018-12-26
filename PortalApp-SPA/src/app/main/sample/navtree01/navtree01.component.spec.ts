/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Navtree01Component } from './navtree01.component';

describe('Navtree01Component', () => {
  let component: Navtree01Component;
  let fixture: ComponentFixture<Navtree01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Navtree01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Navtree01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
