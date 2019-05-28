import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) { }

  ping(url: string, next, error) {
    console.log(`Ping url: ${url}`)
    this.syncRequest(url, r => r.status == 200, next, error)
  }

  private syncRequest(url: string, predicate: Function, next, error) {
    this.http.get(url, { observe: 'response' }).subscribe(
      response => {
        if(predicate(response)) {
          console.log(`URL is resolved`)
          next()
        }
        else error()
      },
      err => {
        console.log("A error occured ")
        error()
      }
    )
  }

}
