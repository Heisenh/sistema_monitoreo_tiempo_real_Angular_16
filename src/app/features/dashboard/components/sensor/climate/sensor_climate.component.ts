import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { SensorsService } from '../../../services/sensors.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sensor-climate',
  templateUrl: './sensor_climate.component.html',
  styleUrls: ['./sensor_climate.component.scss']
})
export class SensorClimateComponent implements OnInit, OnChanges, OnDestroy {

  @Input() sensor: any;
  @Output() cerrar = new EventEmitter<void>();

  public chart!: Chart;
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

    this.initializeChartClime();
    this.loadGraphicClimate();
  }


  ngOnDestroy(): void {
    this.destroyChart();

    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }


  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }


  onDataChange(): void {
    this.destroyChart(); 
    this.initializeChartClime();
  }


  private initializeChartClime(): void {
  
    // Registra módulos necesarios para Chart.js
    Chart.register(...registerables);

    const canvas = document.getElementById('realTimeChartC') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Temperatura',
            backgroundColor: '#168ede',
            borderColor: '#168ede',
            data: [],
          },
          {
            label: 'Humedad',
            backgroundColor: '#11A7AD',
            borderColor: '#11A7AD',
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
            max: 120,
          },
        },
        responsive: true,
      },
    });

  }


  loadGraphicClimate() {
    this.dataSubscription = interval(1000).subscribe(() => {
      this.buildGraphicsClimate();
    });
  }


  buildGraphicsClimate() {
    this._sensorService.regNewSensor(this.sensor.sensor_id).subscribe({
      next: (value: any) => {

        const dataSensor = value.data.slice(-1);

        const dataTemperature = this.chart.data.datasets[0].data;
        const dataHumidity    = this.chart.data.datasets[1].data;

        for (const key in dataSensor) {
          const element = dataSensor[key];
          const labels = this.chart.data.labels as number[];

          if (labels.length > 10) {
            labels.shift();
            dataTemperature.shift();
            dataHumidity.shift();
          }
          
          if (labels.length > 9) {
            let [nextLabel] = labels.slice(-1);
            labels.push(nextLabel+1);
          } else {
            labels.push(labels.length); 
          }

          dataTemperature.push(element.temperature);
          dataHumidity.push(element.humidity);

          this.chart.update();
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
