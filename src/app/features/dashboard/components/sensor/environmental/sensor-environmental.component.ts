import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { SensorsService } from '../../../services/sensors.service';

@Component({
  selector: 'app-sensor-environmental',
  templateUrl: './sensor-environmental.component.html',
  styleUrls: ['./sensor-environmental.component.scss']
})
export class SensorEnvironmentalComponent implements  OnInit, OnChanges, OnDestroy {

  @Input() sensor: any;
  @Output() cerrar = new EventEmitter<void>();

  public chartE!: Chart;
  private dataSubscription!: Subscription;

  sensor_name!: string;
  colorBackground!: string;


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

    // Inicializa el gráfico
    this.initializeChartEnvironmental();
    this.loadGraphicEnvironmental();
  }


  ngOnDestroy(): void {
    this.destroyChart();

    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }


  private destroyChart(): void {
    if (this.chartE) {
      this.chartE.destroy();
    }
  }


  onDataChange(): void {
    this.destroyChart(); 
    this.initializeChartEnvironmental();
  }


  private initializeChartEnvironmental(): void {
  
    // Registra módulos necesarios para Chart.js
    Chart.register(...registerables);

    const canvas = document.getElementById('realTimeChartE') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    this.chartE = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Calidad de aire',
            backgroundColor: '',
            borderColor: '',
            data: [],
          },
          {
            label: 'Nivel de ruido',
            backgroundColor: '',
            borderColor: '',
            data: [],
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            min: 0,
            max: 60,
          },
        },
        responsive: true,
      },
    });

  }


  loadGraphicEnvironmental() {
    this.dataSubscription = interval(1000).subscribe(() => {
      this.buildGraphicsMeteorological();
    });
  }


  buildGraphicsMeteorological() {
    this._sensorService.regNewSensor(this.sensor.sensor_id).subscribe({
      next: (value: any) => {

        const dataSensor = value.data.slice(-1);

        const noise_level = this.chartE.data.datasets[0].data;

        for (const key in dataSensor) {
          const element = dataSensor[key];
          const labels = this.chartE.data.labels as number[];

          if (labels.length > 0) {
            labels.shift();
            noise_level.shift();
          }

          labels.push(element.air_quality);

          if (element.air_quality === 'Buena') {
            let nuevosColoresFondo = '#93fea4';
            this.chartE.data.datasets[0].backgroundColor = nuevosColoresFondo;
          } else {
            let nuevosColoresFondo = '#D593FE';
            this.chartE.data.datasets[0].backgroundColor = nuevosColoresFondo;
          }

          noise_level.push(element.noise_level);

          this.chartE.update();
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
  