import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private apiUrl = environment.base;


  constructor(private httpClient: HttpClient) { }


  // Método para realizar una solicitud GET
  get( endpoint: string ): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`
    return this.httpClient.get( url );
  }


  // Método para realizar una solicitud POST
  post( endpoint: string, data: any ): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`
    return this.httpClient.post(url, data);
  }


  // Método para realizar una solicitud PUT
  put( endpoint: string, data: any ): Observable<any> {

    const url = `${this.apiUrl}/${endpoint}`
    return this.httpClient.put(url, data);

  }


  // Método para realizar una solicitud DELETE
  delete(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.httpClient.delete(url);
  }


}
