import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { SensorsService } from '../../../services/sensors.service';

@Component({
  selector: 'app-sensor-meteorological',
  templateUrl: './sensor_meteorological.component.html',
  styleUrls: ['./sensor_meteorological.component.scss']
})
export class SensorMeteorologicalComponent implements  OnInit, OnChanges, OnDestroy {

  @Input() sensor: any;
  @Output() cerrar = new EventEmitter<void>();

  public chartM!: Chart;
  private dataSubscription!: Subscription;

  sensor_name!: string;

  constructor(
    private _sensorService: SensorsService,
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sensor'] && !changes['sensor']['firstChange']) {
      this.onDataChange();
    }
  }


  ngOnInit() {
    this.sensor_name = this.sensor.sensor_name

    this.initializeChartMeteorological();
    this.loadGraphicMeteorological();
  }


  ngOnDestroy(): void {
    this.destroyChart();

    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }


  private destroyChart(): void {
    if (this.chartM) {
      this.chartM.destroy();
    }
  }


  onDataChange(): void {
    this.destroyChart();
    this.initializeChartMeteorological();
  }


  private initializeChartMeteorological(): void {
  
    // Registra módulos necesarios para Chart.js
    Chart.register(...registerables);

    const canvas = document.getElementById('realTimeChartM') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    this.chartM = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Presión atmosférica',
            backgroundColor: '#5FA8D7',
            borderColor: '#5FA8D7',
            data: [],
          },
          {
            label: 'Velocidad del viento',
            backgroundColor: '#ee964f',
            borderColor: '#ee964f',
            data: [],
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
          y: {
            min: 0,
            max: 1020,
          },
        },
        responsive: true,
      },
    });

  }


  loadGraphicMeteorological() {
    this.dataSubscription = interval(1000).subscribe(() => {
      this.buildGraphicsMeteorological();
    });
  }


  buildGraphicsMeteorological() {
    this._sensorService.regNewSensor(this.sensor.sensor_id).subscribe({
      next: (value: any) => {

        const dataSensor = value.data.slice(-1);

        const pressure   = this.chartM.data.datasets[0].data;
        const wind_speed = this.chartM.data.datasets[1].data;

        for (const key in dataSensor) {
          const element = dataSensor[key];
          const labels = this.chartM.data.labels as number[];

          if (labels.length > 10) {
            labels.shift();
            pressure.shift();
            wind_speed.shift();
          }
          
          if (labels.length > 9) {
            let [nextLabel] = labels.slice(-1);
            labels.push(nextLabel+1);
          } else {
            labels.push(labels.length); 
          }

          pressure.push(element.pressure);
          wind_speed.push(element.wind_speed);

          this.chartM.update();
        }

      },
      error: (err: any) => {
        console.error('ERROR: The response had an error, retrying ', err);
      },

    });
  }


  closeComponent() {
    this.cerrar.emit();
  }


}
