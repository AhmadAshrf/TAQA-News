import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TopService {
  constructor(private _httpClient: HttpClient) { }

  getAllTopNews(): Observable<any> {
    return this._httpClient
      .get(`${environment.baseURL}News/GetTrendNews`)
      .pipe(retry(1),
        catchError((err: HttpErrorResponse) => {
          console.log(err.error)
          return throwError(() => new Error('Something went wrong'))
        }))
  }
}
