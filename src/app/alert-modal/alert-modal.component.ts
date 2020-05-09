import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  @Input() alertParams;
  @Output() alertCallback: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  alertTitle;
  alertBody;
  item;

  ngOnInit(): void {
    this.alertTitle = this.alertParams.alertTitle
    this.alertBody = this.alertParams.alertBody
  }

  getDenied() {
    this.alertCallback.emit({optionSelected: "close"});
  }
  getCancel() {
    this.alertCallback.emit({optionSelected: "cancel"});
  }
  getConfirm() {
    this.alertCallback.emit({optionSelected: "confirm"});
  }
}
