import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../services/products/product.service'
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {

  products: any
  oneProduct: any;
  profile: any

  constructor(private productService: ProductService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.getProducts()
    this.profile = this.authService.getProfile().profile
  }

  getProducts(){

    return this.productService.getAllProducts().subscribe(response =>{
      console.log("Resposta", response.data)
      
      this.products = response.data

    })
  }

  getActiveProducts(){

    return this.productService.getAllActiveProducts().subscribe(response =>{
      console.log("Resposta", response.data)
      
      this.products = response.data

    })
  }

  openProductDetails(product){
    console.log('---openProductDetails---',product)
    this.oneProduct = product
    this.router.navigate(['/gerenciar/produtos'], {state: {data: product}});

  }
  
  inactiveProduct(product) {
    this.productService.inactiveProduct(product).subscribe(response => {
      console.log('response do delete', response)
    })
  }

  activeProduct(product) {
    console.log(product)
    this.productService.activeProduct(product).subscribe(response => {
      console.log('response do delete', response)
    })
  }


}

