import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  constructor(protected http: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url)
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.post<T>(url, data)
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.put<T>(url, data)
  }

  delete<T>(url: string): Observable<T> {
    return this.delete<T>(url)
  }

}
