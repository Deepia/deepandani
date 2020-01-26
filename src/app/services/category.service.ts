import { Injectable } from '@angular/core';
import {Category} from '../models/category';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  serverUrl = environment.baseUrl+'Category/';

  constructor(private http: HttpClient) { }
  getCategories() {
    return this.http.get<Category>(this.serverUrl + 'listOfCategories').pipe(
      catchError(this.handleError)
    );
  }
  createCategory(page) {
    return this.http.post<any>(this.serverUrl + 'createUpdateCategory', page)
    .pipe(
      catchError(this.handleError)
    );
  }
  updateCategory(page) {
    return this.http.post<any>(this.serverUrl + 'createUpdateCategory', page)
    .pipe(
      catchError(this.handleError)
    );
  }
  deleteCategory(id: number) {
    return this.http.get<any>(this.serverUrl + 'deleteCategory/' + id)
    .pipe(
      catchError(this.handleError)
    );
  }

  getCategoryByID(id: number) {
    return this.http.get<Category>(this.serverUrl + 'getCategoryByID/' + id)
    .pipe(
      catchError(this.handleError)
    );
  } 

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong.

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    
    return throwError('Something bad happened. Please try again later.');
  }
}
