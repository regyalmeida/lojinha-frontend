import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/authentication/auth.service';
import { Router } from '@angular/router';
import { ShoppingService } from 'src/services/shopping/shopping.service';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {

  loading: boolean=false;
  profile: any;
  username: any;
  orders
  isShowCollapse: boolean=false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.profile = this.authService.getProfile()
    if(this.profile) { 
      this.username = this.authService.getAuth().user
      this.profile = this.authService.getProfile().profile    
      this.recoverOrders()
    }
    
  }


  recoverOrders() {
    this.loading = true
    
    this.shoppingService.recoverOrders(this.username, this.profile).subscribe(response => { 
      this.orders = response.data
      this.loading = false
    
    }, error => {
     
    })
  }






}

