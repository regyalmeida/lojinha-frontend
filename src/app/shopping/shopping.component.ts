import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/authentication/auth.service';
import { ShoppingService } from 'src/services/shopping/shopping.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  constructor( 
    private authService: AuthService,
    private router: Router,
    private shoppingService: ShoppingService) { }

  productsInformation
  cart
  totalPrice = 0
  profile
  username
  userRecovered:boolean=false
  userMaillingAddress
  userBillingAddress
  cep
  freight = 0
  canCheckout:boolean = false

  ngOnInit() {
    this.cart = this.getCartProducts()
    if(this.cart) {
      console.log(this.cart.data)
      this.productsInformation = this.cart.data
      this.calculateTotalPrice()
    } 

    this.profile = this.authService.getProfile()
    if(this.profile) { 
      this.username = this.authService.getAuth().user
      this.profile = this.authService.getProfile().profile    
      this.recoverUserInfo()
    } else {
      this.cep = ""
    }
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

  saveCep(event, cep){    
    var value
    if(event || cep) {
      if(event){ 
        if(event.target.value !="") {
          value = event.target.value
        } else {
          this.freight = 0          
          this.calculateTotalPrice()
        }
      } else {
        value = cep
      }

      if(value) { 
        this.shoppingService.simulateFreight(value).subscribe(response => {
          console.log('response do delete', response)
          this.freight = response.data.freight
          this.calculateTotalPrice()
        
        })
      }

    } else {
      this.freight = 0
      this.calculateTotalPrice()
    }
  }

  calculateTotalPrice(){
    let value = 0
    if(this.cart) {
      this.cart.data.map(item => {
        value = value + (item.quantity * item.product.price)
      })
    }
    console.log("total prce", this.totalPrice)
    this.totalPrice = value + this.freight
  }

  recoverUserInfo(){
    this.authService.recoverOneUser(this.username).subscribe(response => { 
      console.log("recover usrr",response.data)
      this.userMaillingAddress = response.data[0].maillingAddress 
      this.userBillingAddress = response.data[0].billingAddress 
      this.cep = this.userMaillingAddress.cep
      this.saveCep(null, this.cep)
      this.userRecovered = true
    })
  }  

  selectAddress(selectedAddress) {
    if(selectedAddress == "mailling"){
      this.cep = this.userMaillingAddress.cep
    } else {
      this.cep = this.userBillingAddress.cep
    }
    this.saveCep(null, this.cep)
  }

  selectPayment(selectedPayment){

  }

  checkout() {
    if(this.profile) {
      if(this.cep) {
        this.canCheckout = true
        console.log("Está logado e vai para o checkout")
      } 
    } 
    else {
      this.router.navigate(['/login']);
    }
  }
}
