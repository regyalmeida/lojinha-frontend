import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.baseUrl;
  // url : string = 'http://localhost:6023/api'

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  getAuth() {
    return JSON.parse(window.localStorage.getItem('auth'));
  }

  getProfile() {
    return JSON.parse(window.localStorage.getItem('profile'));
  }

  setAuth(auth, profile) {
    window.localStorage.setItem('auth', JSON.stringify(auth));
    window.localStorage.setItem('profile', JSON.stringify(profile));
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

  recoverUsers(profile){
    return this.http.get<any>(this.url + '/auth/recover/users', 
      {params: new HttpParams().set('profile', profile)})
      .pipe(
        map(response => {
          console.log('service resposnse', response)
          return response;
        })
      );
  }

}
