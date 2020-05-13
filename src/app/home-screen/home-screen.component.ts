import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

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
  imagePath: any;

  constructor(private productService: ProductService, private router: Router, private authService: AuthService, private _sanitizer: DomSanitizer ) { }

  ngOnInit() {
    this.getProducts()
    this.profile = this.authService.getProfile()
    console.log(this.profile)
    if(this.profile) this.profile = this.authService.getProfile().profile 
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

  getImagePath(product){
    let link = 'https://lojinha.s3.us-south.cloud-object-storage.appdomain.cloud/' + product.imageName + '.jpg' 
    this.imagePath = this._sanitizer.bypassSecurityTrustUrl(link)
  }

  openProductDetails(product){
    console.log('---openProductDetails---',product)
    this.oneProduct = product
    this.getImagePath(this.oneProduct)
    this.oneProduct['imagePath'] = this.imagePath.changingThisBreaksApplicationSecurity
    this.router.navigate(['/gerenciar/produtos'], {state: {data: this.oneProduct}});
  }

  openUpdateProduct(product){
    console.log('---openUpdateProduct---',product)
    this.oneProduct = product
    this.getImagePath(this.oneProduct)
    this.oneProduct['imagePath'] = this.imagePath.changingThisBreaksApplicationSecurity
    this.router.navigate(['/gerenciar/produtos'], {state: {data: this.oneProduct, update: true}});
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

