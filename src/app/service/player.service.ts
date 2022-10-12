import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { CustomResponse } from '../interface/custum-response';
import { Player } from '../interface/player';
import { IdentityCardType } from '../enum/identity-card-type.enun'

@Injectable({ providedIn: 'root' })
export class PlayerService {

  private readonly apiUrl = 'http://localhost:8080/api/v1/players';

  private readonly httpOptions = {
     headers: new HttpHeaders()
    .set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaW5kYSIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJkYXRhOndyaXRlIn0seyJhdXRob3JpdHkiOiJwbGF5ZXI6cmVhZCJ9LHsiYXV0aG9yaXR5IjoiZGF0YTpyZWFkIn0seyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn0seyJhdXRob3JpdHkiOiJwbGF5ZXI6d3JpdGUifV0sImlhdCI6MTY2NTU3OTE4OSwiZXhwIjoxNjY2NDA3NjAwfQ.j-Ah4-UYtd1wjWsbM8n8qt2QHjMBPZrBjo-d52XjiM7Xtw6NMujZGMG8j-k9iNJ7MpNqN6vYnS5BS-m-LNgy-A')
   };

  constructor(private http: HttpClient) { }

  players$ = <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/list`, this.httpOptions)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    )

  save$ = (player: Player) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/save`, player, this.httpOptions)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    )
    
  delete$ = (playerId: number) => <Observable<CustomResponse>>
   this.http.delete<CustomResponse>(`${this.apiUrl}/delete/${playerId}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    )

  filter$ = (identityCardType: IdentityCardType, response: CustomResponse) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
      subscriber => {
        console.log(response);
        subscriber.next(
          identityCardType === IdentityCardType.ALL ? { ...response, message: `Players filtered by ${identityCardType} IdentityCardType` } :
            {
              ...response,
              message: response.data.players
                .filter(player => player.dni === identityCardType).length > 0 ? `Players filtered by 
            ${identityCardType === IdentityCardType.DNI ? 'DNI'
                : 'LC-LE'} IdentityCardType` : `No Players of ${identityCardType} found`,
              data: {
                players: response.data.players
                  .filter(player => player.dni === identityCardType)
              }
            }
        );
        subscriber.complete();
      }
    )
      .pipe(
        tap(console.log),
        catchError(this.handleError)
    )
    
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(()=>`An Error ocurred: ${error.status}`);
  }
}
