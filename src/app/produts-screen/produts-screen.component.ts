import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/products/product.service';

import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-produts-screen',
  templateUrl: './produts-screen.component.html',
  styleUrls: ['./produts-screen.component.scss']
})
export class ProdutsScreenComponent implements OnInit {
  create: boolean=false;
  product: any;

  constructor(private http: HttpClient, private productService: ProductService, private _sanitizer: DomSanitizer) { }
  imageExists: boolean;
  imagePath: any;
  productInfo: any;
  imageName: string;
  link: string;
  updateDelete: boolean = false;

  ngOnInit() { 
    if(history.state.data) {
      this.product = history.state.data
      this.updateDelete = !this.updateDelete
    }
  }

  selectedFile: File = null;
  fd = new FormData();
  imageID: string

  createFormData(event) {
    this.selectedFile = <File>event.target.files[0]
    // console.log(this.selectedFile)
    this.fd.append('file', this.selectedFile, 'file.jpg');
    // this.fd.append('file', this.selectedFile, this.selectedFile.name)  
  }

  upload() {

    this.fd.append('name', 'auau7')
    this.fd.append('price', '1234.56')
    this.fd.append('description', "aedxcftygvbhjjnmkl,m")
    this.fd.append('quantity', '1000')
    this.fd.append('category', 'doguinho')

    this.productInfo = this.productService.registerNewProduct(this.fd).subscribe(response => {
      this.imageName = '6psfur.jpg'
      this.imageExists = true
      this.link = 'https://lojinha.s3.us-south.cloud-object-storage.appdomain.cloud/' + this.imageName
      this.imagePath = this._sanitizer.bypassSecurityTrustUrl(this.link)
      console.log(this.imagePath)
      console.log("Resposta", response)

    })
  }

  getThisImage(event) {
    console.log(event.target.value)
    this.imageID = event.target.value

    this.productInfo = this.productService.getOneProduct(event.target.value).subscribe(response => {
      console.log("Resposta", response.data[0])
      this.imageExists = true
    })
  }

  registerNewProduct() {
    this.create = !this.create
    this.updateDelete = false
  }

  deleteProduct(){
    this.product['flag'] = 'inative'
    this.productInfo = this.productService.deleteProduct(this.product).subscribe(response => {
      console.log('response do delete', response)

    })
  }

}
