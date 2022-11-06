import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { GatewayModel } from '../interfaces/gateway.interface';
import { DeviceModel } from '../interfaces/device.interface';

@Injectable({
  providedIn: 'root',
})
export class GatewayService {
  URL = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllGateways(): Observable<GatewayModel> {
    return this.httpClient
      .get<GatewayModel>(this.URL + 'gateway')
      .pipe(retry(1), catchError(this.handleError));
  }

  getGateway(id: string): Observable<GatewayModel> {
    return this.httpClient
      .get<GatewayModel>(this.URL + 'gateway/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAllDevice(): Observable<DeviceModel> {
    return this.httpClient
      .get<DeviceModel>(this.URL + 'device')
      .pipe(retry(1), catchError(this.handleError));
  }

  getDevice(gateway_id: string): Observable<DeviceModel[]> {
    return this.httpClient.get<DeviceModel[]>(this.URL + 'device').pipe(
      retry(1),
      map((v) => {
        return v.filter((result) => result.gateway_id === gateway_id);
      }),
      catchError(this.handleError)
    );
  }

  createGateway(gateway: any): Observable<GatewayModel> {
    console.log('createGateway: ', gateway);
    return this.httpClient
      .post<GatewayModel>(
        this.URL + 'gateway',
        JSON.stringify(gateway),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateGateway(id: any, gateway: any): Observable<GatewayModel> {
    return this.httpClient
      .put<GatewayModel>(
        this.URL + 'gateway/' + id,
        JSON.stringify(gateway),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteGateway(id: any) {
    console.log('Delete: ', id);
    return this.httpClient
      .delete<GatewayModel>(this.URL + 'gateway/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
