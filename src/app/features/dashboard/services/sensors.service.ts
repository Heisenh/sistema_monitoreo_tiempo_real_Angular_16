import { Injectable } from '@angular/core';
import { GeneralService } from '../../../core/services/general.service';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  constructor(private _generalService: GeneralService) { }


  getAllSensors() {
    return this._generalService.get('sensors/getAllSensors');
  }


  getSensorById(id: number) {
    return this._generalService.get(`sensors/getSensorById/${id}`);
  }


  regNewSensor(sensor_id: number) {
    return this._generalService.post(`sensors/regNewSensor`, {sensor_id});
  }


}
