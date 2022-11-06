import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GatewayModel } from '../interfaces/gateway.interface';

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

  getAllGateway(id: string): Observable<GatewayModel> {
    return this.httpClient
      .get<GatewayModel>(this.URL + 'gateway')
      .pipe(retry(1), catchError(this.handleError));
  }

  createGateway(gateway: any): Observable<GatewayModel> {
    console.log('createGateway: ',gateway);
    return this.httpClient
      .post<GatewayModel>(
        this.URL + 'gateway',
        JSON.stringify(gateway),
        this.httpOptions
      )
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
