import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = environment.baseUrl;
  // url : string = 'http://localhost:6023/api'

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // getOneProduct(productId) {
  //   return this.http.get<any>(this.url + '/product/recover',
  //     { params: new HttpParams().set('id', productId) })
  //     .subscribe(response => {
  //       console.log('service resposnse', response)
  //       return response.data
  //     })
  // }

  getAllProducts() {
    return this.http.get<any>(this.url + '/product/recover')
      .pipe(
        map(response => {
          console.log('service resposnse', response)
          return response
        })
      )
  }

  getOneProduct(productId) {
    return this.http.get<any>(this.url + '/product/recover',
      { params: new HttpParams().set('id', productId) })
      .pipe(
        map(response => {
          console.log('service resposnse', response)
          return response
        })
      )
  }

  registerNewProduct(productInfo) {
    return this.http.post<any>('http://localhost:6023/api/product/register', productInfo)
      .pipe(
        map(response => {
          console.log('service resposnse', response)
          return response;
        })
      );
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

  recoverUsers(profile) {
    return this.http.get<any>(this.url + '/auth/recover/users',
      { params: new HttpParams().set('profile', profile) })
      .pipe(
        map(response => {
          console.log('service resposnse', response)
          return response;
        })
      );
  }

}