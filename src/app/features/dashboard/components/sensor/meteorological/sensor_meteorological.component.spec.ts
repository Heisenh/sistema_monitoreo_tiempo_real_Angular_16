/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Sensor_meteorologicalComponent } from './sensor_meteorological.component';

describe('Sensor_meteorologicalComponent', () => {
  let component: Sensor_meteorologicalComponent;
  let fixture: ComponentFixture<Sensor_meteorologicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sensor_meteorologicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sensor_meteorologicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
