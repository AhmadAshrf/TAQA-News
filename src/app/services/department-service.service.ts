import { catchError, Observable, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {
  constructor(private _httpClient:HttpClient) { }
  getDepartmentByID(id: number): Observable<any> {
    return this._httpClient
      .get(`${environment.baseURL}News/GetByDepartmentID?departmentID=${id}`)
      .pipe(retry(1),
        catchError((err: HttpErrorResponse) => {
          console.log(err.error)
          return throwError(() => new Error('Something went wrong'))
        }))
  }
}
