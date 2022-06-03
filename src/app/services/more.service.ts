import { MoreModule } from './../models/more.module';

import { Observable, retry, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoreService {
  constructor(private _httpClient: HttpClient) { }
  
  getAllMore(): Observable<MoreModule[]> {
    return this._httpClient
      .get<MoreModule[]>(`${environment.baseURL}News/GetTopNews`)
      .pipe(retry(1),
        catchError((err: HttpErrorResponse) => {
          console.log(err.error)
          return throwError(() => new Error('Something went wrong'))
        }))
  }
}
