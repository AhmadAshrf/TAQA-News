import { MenuModule } from './../models/menu.module';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HeaderMenuService {
  constructor(private _httpClient: HttpClient) { }

  getAllDepartmentMenu(): Observable<MenuModule[]> {
    return this._httpClient
      .get<MenuModule[]>(`${environment.baseURL}Department/GetMenu`)
      .pipe(retry(1),
        catchError((err: HttpErrorResponse) => {
          console.log(err.error)
          return throwError(() => new Error('Something went wrong'))
        }))
  }
}
