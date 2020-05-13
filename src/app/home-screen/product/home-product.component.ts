import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.scss']
})
export class HomeProductComponent implements OnInit {
  
  @Input() product
  @Output() productCallback: EventEmitter<any> = new EventEmitter<any>();

  imagePath: any

  constructor(private _sanitizer: DomSanitizer ) { }

  ngOnInit() {
    console.log("gdgdhdj")
    this.getImagePath()
  }

  getImagePath(){
    console.log('--- getImagePath ---')
    let link = 'https://lojinha.s3.us-south.cloud-object-storage.appdomain.cloud/' + this.product.imageName + '.jpg' 
    this.imagePath = this._sanitizer.bypassSecurityTrustUrl(link)
    this.product['imagePath'] = this.imagePath.changingThisBreaksApplicationSecurity
  }

  go2productDetails(product) {
    console.log('--- product details --- ')
    this.productCallback.emit({product: product});
  }
}
