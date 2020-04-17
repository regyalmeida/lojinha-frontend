import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

// url: string = environment.localUrl;
url : string = 'http://localhost:6023/api'

constructor(private http: HttpClient) { }

private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


sendCepToValidation(cep) {
  return this.http.get<any>(this.url + '/validator/cep',
    { params: new HttpParams().set('cep', cep) })
    .pipe(
      map(response => {
        console.log('service resposnse', response)
        return response
      })
    )
}

}
