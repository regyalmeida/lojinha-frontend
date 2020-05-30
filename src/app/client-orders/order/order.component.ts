import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/services/authentication/auth.service';
import { ShoppingService } from 'src/services/shopping/shopping.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  
  @Input() order
  // @Output() orderCallback: EventEmitter<any> = new EventEmitter<any>();
 
  isShowCollapse: boolean = false;
  profile: any;
  username: any;

  constructor(  private authService: AuthService,private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.profile = this.authService.getProfile()
    if(this.profile) { 
      this.username = this.authService.getAuth().user
      this.profile = this.authService.getProfile().profile    
    }
    console.log("orderrrrrr ", this.order)
  }

  showCollapse() {   
    this.isShowCollapse = !this.isShowCollapse
  }

  status(event) {
    this.order.status = event.target.value
    console.log(event.target.value)
     
  }

  updateStatus(checkoutCode){  
    let payload = { status : this.order.status , checkoutCode:checkoutCode } 
    this.shoppingService.updateOrder(payload).subscribe(response => { 
     console.log("atualizou")
    
    }, error => {
     
    })
  }

}
