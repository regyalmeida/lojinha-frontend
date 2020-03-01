import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../services/products/product.service'

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {

  products: any
  oneProduct: any;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.getProducts()
  }

  getProducts(){

    return this.productService.getAllProducts().subscribe(response =>{
      console.log("Resposta", response.data)
      
      this.products = response.data

    })
  }

  openProductDetails(product){
    console.log('---openProductDetails---',product)
    this.oneProduct = product
    this.router.navigate(['/gerenciar/produtos'], {state: {data: product}});

  }
  



}

