import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { CustomResponse } from '../interface/custum-response';
import { Player } from '../interface/player';

@Injectable({ providedIn: 'root' })
export class PlayerService {

  private readonly apiUrl = 'http://localhost:8080/api/v1/players';

  private readonly httpOptions = {
     headers: new HttpHeaders()
    .set('Authorization', 'Bearer ${token}')
   };

  constructor(private http: HttpClient) { }

  players$ = <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/list`, this.httpOptions)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    )

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(()=>`An Error ocurred: ${error.status}`);
  }
}
