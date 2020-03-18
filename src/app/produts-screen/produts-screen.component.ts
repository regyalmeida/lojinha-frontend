import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products/product.service';
import { AuthService } from '../../services/authentication/auth.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Form, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-produts-screen',
  templateUrl: './produts-screen.component.html',
  styleUrls: ['./produts-screen.component.scss']
})
export class ProdutsScreenComponent implements OnInit {

  constructor(private http: HttpClient,
    private productService: ProductService,
    private _sanitizer: DomSanitizer,
    private authService: AuthService,
    private fb: FormBuilder) { }

  create: boolean = false;
  product: any;

  imageExists: boolean;
  imagePath: any;
  productInfo: any;
  productUpdatedInfo: any;
  imageName: string;
  link: string;
  update: boolean = false
  profile: string;
  showProduct: boolean = false

  registerForm: Form;
  selectedFile: File = null;
  registerfd = new FormData();
  updatefd = new FormData();
  // updatefd = new FormGroup({
  //   updatedName: new FormControl(this.product.name),
  //   updatedDescription: new FormControl(this.product.description),
  //   updatedCategory: new FormControl(this.product.category)
  // });

  imageID: string
  name: string
  description: string
  category: string
  price: any
  quantity: any
  updatedName: string
  updatedDescription: string
  updatedCategory: string
  updatedImageID: string

  updatedPrice: any
  updatedQuantity: any

  ngOnInit() {
    this.profile = this.authService.getProfile().profile
    console.log("O perfil é de:", this.profile)
    if (history.state.data) {    //caso tenha chegado aqui para detalhe do produto
      this.product = history.state.data
      console.log(this.product)
      this.showProduct = !this.showProduct
    }
  }

  createFormData(event) {
    this.selectedFile = <File>event.target.files[0]
    // console.log(this.selectedFile)
    this.registerfd.append('file', this.selectedFile, 'file.jpg');
    // this.fd.append('file', this.selectedFile, this.selectedFile.name)  
  }

  upload() {
    this.registerfd.append('name', this.name)
    this.registerfd.append('price', this.price)
    this.registerfd.append('description', this.description)
    this.registerfd.append('quantity', this.quantity)
    this.registerfd.append('category', this.category)

    this.productInfo = this.productService.registerNewProduct(this.registerfd).subscribe(response => {
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
    this.showProduct = false
  }

  deleteProduct() {
    this.product['flag'] = 'inative'
    this.productInfo = this.productService.deleteProduct(this.product).subscribe(response => {
      console.log('response do delete', response)
    })
  }

  updateProduct() {
    this.update = !this.update
    this.showProduct = !this.showProduct
    this.updatedName = this.product.name
    this.updatedPrice = this.product.price
    this.updatedDescription = this.product.description
    this.updatedCategory = this.product.category
    this.updatedImageID = this.product._id
    this.updatedQuantity = this.product.quantity
  }


  sendUpdate() {
    let newProduct = {
      id: this.updatedImageID,
      name: this.updatedName,
      price: this.updatedPrice,
      description: this.updatedDescription,
      category: this.updatedCategory,
      imageName: this.product.imageName,
      flag: 'active',
      quantity: this.updatedQuantity
    }

    this.productUpdatedInfo = this.productService.updateProduct(newProduct).subscribe(response => {
      console.log("Resposta", response)

    })

    console.log(this.updatefd)
    console.log(this.updatedName)
  }

}
