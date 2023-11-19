import { Observable } from 'rxjs';
import { GeneralService } from './../../../core/services/general.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _generalServices: GeneralService) { }


  login(data: { user: string, password: string }): Observable<any> {
    return this._generalServices.post('auth', data);
  }


}
