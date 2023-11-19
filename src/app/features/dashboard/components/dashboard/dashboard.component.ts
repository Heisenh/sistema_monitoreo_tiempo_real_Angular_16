import { Component, OnInit } from '@angular/core';
import { SensorsService } from '../../services/sensors.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sensors: any[] = [];
  sensorSelected: any;

  viewComponenS1 = true;
  viewComponenS2 = true;
  viewComponenS3 = true;

  constructor(
    private _sensorsService: SensorsService) { }

  ngOnInit() {
    this.getAllSensors();
  }


  getAllSensors() {

    this._sensorsService.getAllSensors().subscribe({
      next: (value: any) =>  {
        this.sensors = value;
      },
      error: (err: any) => {
        console.log('err :>> ', err);
      },
    })

  }


  getSensorById(sensor: any) {
    this.sensorSelected = sensor;
  }

  hideComponentS1() {
    this.viewComponenS1 = false;
  }

  hideComponentS2() {
    this.viewComponenS2 = false;
  }

  hideComponentS3() {
    this.viewComponenS3 = false;
  }


}
