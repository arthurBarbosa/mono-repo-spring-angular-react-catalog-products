import { CategoryModel } from './category-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = 'http://localhost:8080/categories';

  constructor(
    private snackBar: MatSnackBar,
    private http:HttpClient ) { }

  create(category: CategoryModel): Observable<CategoryModel>{
    return this.http.post<CategoryModel>(this.baseUrl, category).pipe(
      map(category => category),
      catchError(e => this.errorHandler(e))
    );
  }

  showMessage(msg: string, isError: boolean): void{
    this.snackBar.open(msg, 'X', {
      duration:3000, 
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  errorHandler(e: any): Observable<any>{
    this.showMessage(e.error.message, true);
    return EMPTY;
  }
}
