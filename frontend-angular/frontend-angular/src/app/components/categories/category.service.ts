import { CategoryModel } from './category-model';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  read(page, size): Observable<CategoryModel[]> {
    const params = new HttpParams()
    .set('page', page)
    .set('linesPerPage', size)
    return this.http.get<CategoryModel[]>(`${this.baseUrl}?${params.toString()}`).pipe(
      map(obj => obj),
    catchError(e => this.errorHandler(e)));
  }

  readById(id: string): Observable<CategoryModel>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<CategoryModel>(url);
  }

  update(category: CategoryModel): Observable<CategoryModel> {
    const url = `${this.baseUrl}/${category.id}`;
    return this.http.put<CategoryModel>(url, category);
  }

  delete(id: string): Observable<CategoryModel> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<CategoryModel>(url);
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
