import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  
  @Input() order
  // @Output() orderCallback: EventEmitter<any> = new EventEmitter<any>();
 
  isShowCollapse: boolean = false;

  constructor() { }

  ngOnInit() {

    console.log("orderrrrrr ", this.order)
  }

  showCollapse() {   
    this.isShowCollapse = !this.isShowCollapse
  }

}
