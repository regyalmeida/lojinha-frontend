import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/authentication/auth.service';
import { ShoppingService } from 'src/services/shopping/shopping.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  constructor( 
    private authService: AuthService,
    private router: Router,
    private shoppingService: ShoppingService,
    private fb: FormBuilder) { }

  productsInformation
  cart
  totalPrice = 0
  profile
  username
  userRecovered:boolean=false
  userMaillingAddress
  userBillingAddress
  shippingAddress
  cep
  freight = 0
  canPay:boolean = false
  paymentMethod
  canCheckout:boolean = false
  loading:boolean = false
  confirmationModal:boolean = false
  alertParams

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
          this.cep= null       
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
      this.shippingAddress = this.userMaillingAddress
      this.saveCep(null, this.cep)
      this.userRecovered = true
    })
  }  

  selectAddress(selectedAddress) {
    if(selectedAddress == "mailling"){
      this.shippingAddress = this.userMaillingAddress
      this.cep = this.userMaillingAddress.cep
    } else {
      this.shippingAddress = this.userBillingAddress
      this.cep = this.userBillingAddress.cep
    }
    this.saveCep(null, this.cep)
  }


  selectPayment(selectedPayment){
    if(selectedPayment ==  'creditCard') {
      this.paymentMethod = 'creditCard'
    } else {
      this.paymentMethod = 'bankSlip'
    }
  } 

  checkout() {
    if(this.profile) {
      if(this.cep) {
        this.canPay = true       
      } 
    } 
    else {
      this.router.navigate(['/login']);
    }
  }

  endPay(){
    this.canCheckout = true
  }

  endShopping() {
    this.loading = true
    
    let shoppingObject = {
      user: this.username,
      itens: this.productsInformation,                  
      freight: this.freight,
      totalPrice: this.totalPrice,
      shippingAddress: this.shippingAddress,
      paymentMethod: this.paymentMethod
    }
    this.shoppingService.checkout(shoppingObject).subscribe(response => { 
      console.log("Fimmmmmm", response)
      this.loading = false
      this.alertParams = {
        alertBody: `Sua compra foi efetuada com sucesso. Código para acompanhamento: ${response.data.checkoutCode}`
      }
      this.confirmationModal = true
    }, error => {
      this.alertParams = {
        
        alertBody: "Houve um problema ao processar sua compra, por favor tente novamente!"
      }
      this.loading = false
      this.confirmationModal = true
    })
  }

  endConfirmationModal(event){
    console.log(event)
   this.confirmationModal = false 
   this.router.navigate(['/pedidos']);
  }

  giveUp(){
    window.localStorage.removeItem("cart")
    this.router.navigate(['/']);
  }
}
