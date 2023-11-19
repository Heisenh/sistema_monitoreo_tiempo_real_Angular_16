/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SensorClimateComponent } from './sensor_climate.component';

describe('SensorComponent', () => {
  let component: SensorClimateComponent;
  let fixture: ComponentFixture<SensorClimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorClimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorClimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
