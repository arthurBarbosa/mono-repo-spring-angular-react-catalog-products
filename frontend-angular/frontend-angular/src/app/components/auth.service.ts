import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { TokenService } from './security/token.service';

const OAUTH_CLIENT = 'angular';
const OAUTH_SECRET = 'angular123';
const API_URL = 'http://localhost:8080/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + btoa(OAUTH_CLIENT + ':' + OAUTH_SECRET)
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl = '';
  @Output() showMenu:EventEmitter<boolean> = new EventEmitter();


  private static handleError(error: HttpErrorResponse): any{
    if(error.error instanceof ErrorEvent){
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status},`+
        `body was: ${error.error}`);
    }

    return throwError(
      'Something bad happened; please try again later.'
    )

  }

  private static log(message: string): any {
    console.log(message);
  }

  constructor(private http:HttpClient, private tokenService: TokenService) { }

  login(loginData: any): any{
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
    .set('username', loginData.username)
    .set('password', loginData.password)
    .set('grant_type', 'password');

    return this.http.post<any>(API_URL+'oauth/token', body, HTTP_OPTIONS)
    .pipe(
      tap(res => {
        this.tokenService.saveToken(res.access_token);
        this.tokenService.saveRefreshToken(res.refresh_token)
        this.showMenu.emit(true);
      }),
      catchError(AuthService.handleError)
      
    )

  }

  refreshToken(refreshData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('refresh_token', refreshData.refresh_token)
      .set('grant_type', 'refresh_token');
    return this.http.post<any>(API_URL + 'oauth/token', body, HTTP_OPTIONS)
      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }


  
}
