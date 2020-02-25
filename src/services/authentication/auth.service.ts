import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  getAuth() {
    return JSON.parse(window.localStorage.getItem('auth'));
  }

  setAuth(obj) {
    window.localStorage.setItem('auth', JSON.stringify(obj));
  }

  isLoggedIn() {
    const auth = this.getAuth();
    return auth != null ? true : false;
  }

  getAllInfo(obj) {
    return this.http.post<any>(this.url + '/auth/login', obj)
      .pipe(
        map(response => {
          console.log('service resposnse', response)
          return response;
        })
      );
  }

}
