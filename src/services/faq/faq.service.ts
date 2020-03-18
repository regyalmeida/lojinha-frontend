import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  url: string = environment.localUrl;
  // url : string = 'http://localhost:6023/api'

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getFaq() {
    return this.http.get<any>(this.url + '/faq/recover')
      .pipe(
        map(response => {
          console.log('service resposnse', response)
          return response
        })
      )
  }


}
