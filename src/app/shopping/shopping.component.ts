import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  constructor( 
    private authService: AuthService,
    private router: Router) { }
  productsInformation
  cart
  totalPrice = 0
  profile

  ngOnInit() {
    this.cart = this.getCartProducts()
    if(this.cart) {
      console.log(this.cart.data)
      this.productsInformation = this.cart.data
      this.calculateTotalPrice()
    } 

    this.profile = this.authService.getProfile()
    if(this.profile) this.profile = this.authService.getProfile().profile     
  }
  
  getCartProducts() {
    return JSON.parse(window.localStorage.getItem('cart'));
  }

  saveQuantity(event, productName){    
    let found = this.cart.data.findIndex(element => element.product.name == productName);
    this.cart.data[found].quantity = event.target.value    
    this.setProduct2Cart(this.cart) 
    this.calculateTotalPrice()
    if(event.target.value == "0") {
      this.removeProduct(productName)
    }
  }

  setProduct2Cart(cart) {
    window.localStorage.setItem('cart', JSON.stringify(cart));    
  }

  removeProduct(productName){    
    let found = this.cart.data.findIndex(element => element.product.name == productName);
    this.cart.data.splice(found, 1)
    this.setProduct2Cart(this.cart)
    location.reload(); 
  }

  calculateTotalPrice(){
    let value = 0
    this.cart.data.map(item => {
      value = value + (item.quantity * item.product.price)
    })
    this.totalPrice = value
  }

  checkout() {
    if(this.profile) {
      console.log("Está logado e vai para o checkout")
    } 
    else {
      this.router.navigate(['/login']);
    }
  }
}
