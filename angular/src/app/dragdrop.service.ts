import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class DragdropService {
  id: String;

  constructor(private http: HttpClient, private router: Router) { }

  addFiles(files: File) {
    var arr = []
    var formData = new FormData();
    arr.push(files);

    arr[0].forEach((item, i) => {
      formData.append('avatar', arr[0][i]);
    })

    this.id = this.router.url.replace('/user-profile/', '');


    return this.http.post(`http://localhost:4000/api/create-file/${this.id}`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errMsg)
    )
  }

  errMsg(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
