import { DetailsModel } from './../models/details.model';

import { catchError, Observable, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  constructor(private _httpClient: HttpClient) { }

  getNewsDetails(id: number): Observable<DetailsModel> {
    return this._httpClient
      .get<DetailsModel>(`${environment.baseURL}News/GetDetails?ID=${id}`)
      .pipe(retry(1),
        catchError((err: HttpErrorResponse) => {
          console.log(err.error)
          return throwError(() => new Error('Something went wrong'))
        }))
  }
}
