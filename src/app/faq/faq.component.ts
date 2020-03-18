import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../services/faq/faq.service'

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  questions:any; 
  
  constructor(private faqService: FaqService) { }

  ngOnInit() {
    this.getFaq()
  }

  getFaq(){

    return this.faqService.getFaq().subscribe(response =>{
      console.log("Resposta", response.data)
      
      this.questions = response.data

    })
  }

}
