import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SensorClimateComponent } from './components/sensor/climate/sensor_climate.component';
import { SensorMeteorologicalComponent } from './components/sensor/meteorological/sensor_meteorological.component';
import { SensorEnvironmentalComponent } from './components/sensor/environmental/sensor-environmental.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    
  ],
  declarations: [
    DashboardComponent,
    NavbarComponent,
    SensorClimateComponent,
    SensorMeteorologicalComponent,
    SensorEnvironmentalComponent
  ]
})
export class DashboardModule { }
