import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = 'http://localhost:8080/users';

  constructor(
    private http: HttpClient,
    private snackBar:MatSnackBar) { }


  private static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.errors[0].message}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  private static log(message: string): any {
    console.log(message);
    
  }

 
  

  createUser(data: any): Observable<any>{
    return this.http.post<any>(this.baseUrl, data)
    .pipe(
      tap(_ => this.succesDialogMessage()),
      catchError(e => this.errorDialogMessage(e)));
  }

  showMessage(msg: string, isError: boolean):void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  errorDialogMessage(e: any): Observable<any>{
    this.showMessage(e.error.errors[0].message, true);
    return EMPTY;
  }

  succesDialogMessage(): Observable<any>{
    this.showMessage("Usuário salvo com sucesso", false);
    return EMPTY;
  }



  
}
