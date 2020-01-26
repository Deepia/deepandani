import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import{Pages} from '../models/pages';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  serverUrl = environment.baseUrl+'Blog/';

  constructor(private http: HttpClient) { }
  getBlogs(categoryid?: number) {
    return this.http.get<Blog>(this.serverUrl + 'listadminblogs/' + categoryid).pipe(
      catchError(this.handleError)
    );
  }
  getBlog(id: number) {
    return this.http.get<Blog>(this.serverUrl + 'getBlogForEdit/' + id).pipe(
      catchError(this.handleError)
    );
  }
  createBlog(blog) {
    return this.http.post<any>(this.serverUrl + 'createUpdateBlog', blog)
    .pipe(
      catchError(this.handleError)
    );
  }
  updateBlog(blog) {
    return this.http.post<any>(this.serverUrl + 'createUpdateBlog', blog)
    .pipe(
      catchError(this.handleError)
    );
  }
  deleteBlog(id: number) {
    return this.http.get<any>(this.serverUrl + 'deleteBlog/'+id).pipe(
      catchError(this.handleError)
    );
  }

  deletePage(id: number) {
    return this.http.get<any>(this.serverUrl + 'deletePage/' + id)
    .pipe(
      catchError(this.handleError)
    );
  }

  createStaticPage(page) {
    return this.http.post<any>(this.serverUrl + 'createUpdateStaticPage', page)
    .pipe(
      catchError(this.handleError)
    );
  }
  updateStaticPage(page) {
    return this.http.post<any>(this.serverUrl + 'createUpdateStaticPage', page)
    .pipe(
      catchError(this.handleError)
    );
  }
  deleteStaticPage(id: number) {
    return this.http.get<any>(this.serverUrl + 'deleteStaticPage/' + id)
    .pipe(
      catchError(this.handleError)
    );
  }

  getStaticPageByID(id: number) {
    return this.http.get<Pages>(this.serverUrl + 'getStaticPageByID/' + id)
    .pipe(
      catchError(this.handleError)
    );
  }
  getAllStaticPage() {
    return this.http.get<Pages>(this.serverUrl + 'getAllStaticPage')
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
