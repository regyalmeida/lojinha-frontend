import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {
  imageExists: boolean;
  image: any;
  base64: any;
  image_base64: any;
  imagePath: any;

  constructor(private http: HttpClient, private authService: AuthService, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  selectedFile: File = null;
  fd = new FormData();
  imageID: string

  createFormData(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile)
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
    console.log(this.fd)
  }

  upload() {
    let obj = {
      name: "produto tal tal",
      price: 1234.56,
      description: "aedxcftygvbhjjnmkl,m",
      file: this.fd
    }
    this.http.post('http://localhost:6023/api/product/register', obj)
    .subscribe( result => {
      console.log(result)
    });
  }

  
  getThisImage(event){
    console.log(event.target.value)
    this.imageID = event.target.value
    this.http.get<any>('http://localhost:6023/api/product/recover', {params: new HttpParams().set('id', this.imageID)})
    .subscribe(result => {
      let res = result 
      console.log(res.data[0].base64)
      this.imageExists = true
      // this.image_base64 = result.data[0].base_64
      // var blob = new Blob([this.image_base64], {type: 'image/png'});
      // var file = new File([blob], 'imageFileName.png');

      this.image_base64 =  "data:image/*;base64,"+res.data[0].base64
      this.imagePath = this._sanitizer.bypassSecurityTrustUrl(this.image_base64)
      console.log(this.imagePath)
    })
    
  }

}
