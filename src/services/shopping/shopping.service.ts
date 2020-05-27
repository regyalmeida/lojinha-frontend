import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

// url: string = environment.localUrl;
url : string = 'http://localhost:6023/api'

constructor(private http: HttpClient) { }

private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

params = new HttpParams();

simulateFreight(cep) {
  return this.http.get<any>(this.url + '/shop/freight',
    { params: new HttpParams().set('cep', cep) })
    .pipe(
      map(response => {
        console.log('service resposnse', response)
        return response
      })
    )
}

checkout(shoppingObject) {
  return this.http.post<any>(this.url + '/shop/checkout', shoppingObject)
    .pipe(
      map(response => {
        console.log('service resposnse', response)
        return response;
      })
    );
}
recoverOrders(username, profile) {
  this.params = this.params.append('user', username);
  this.params = this.params.append('profile', profile);

  return this.http.get<any>(this.url + '/shop/recover/orders', 
  {params: this.params})
  .pipe(
    map(response => {
      console.log('service resposnse', response)
      return response;
    })
  );
}

updateOrder(payload){
  return this.http.put<any>(this.url + '/shop/order/', payload)
  .pipe(
    map(response => {
      console.log('service resposnse', response)
      return response;
    })
  );
}

}
