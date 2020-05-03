import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  constructor() { }
  productsInformation
  cart
  ngOnInit() {
    this.cart = this.getCartProducts()
    this.productsInformation = this.cart.data
  }


  getCartProducts() {
    return JSON.parse(window.localStorage.getItem('cart'));
  }

  saveQuantity(event, productName){    
    let found = this.cart.data.findIndex(element => element.product.name == productName);
    this.cart.data[found].quantity = event.target.value    
    this.setProduct2Cart(this.cart) 
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
}
