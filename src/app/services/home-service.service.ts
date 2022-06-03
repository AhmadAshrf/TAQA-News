import { HomeModule } from './../models/home.module';

import { catchError, Observable, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  constructor(private _httpClient: HttpClient) { }

  getHomeDepartment(): Observable<HomeModule[]> {
    return this._httpClient
      .get<HomeModule[]>(`${environment.baseURL}Department/GetHomeDepartments`)
      .pipe(retry(1),
        catchError((err: HttpErrorResponse) => {
          console.log(err.error)
          return throwError(() => new Error('Something went wrong'))
        }))
  }
}
