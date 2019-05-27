import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) { }

  async ping(url: string) {
    try {
      return await this.syncRequest(url, r => r.status === 200)
    }
    catch(err) {
      return false
    }
  }

  private syncRequest(url: string, predicate: Function): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.get(url, { observe: 'response' })
        .subscribe(response => {
            if(predicate(response)) resolve(true)
            else reject(false)
          },
          err => reject(false)
        )
    })

  }

}
