import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  objLogin

  registerForm: FormGroup;
  name: string
  user: string
  password: string
  profile: string
  registerfd = new FormData();
  userInfo: any;

  profileType;
  cepIsValid: boolean = false
  selectedMaillingType: boolean = false



  constructor(private http: HttpClient,private authService: AuthService, private fb: FormBuilder) { 
    this.objLogin = this.authService.getAuth();
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      profile: [(this.objLogin ? null : 'cliente'), Validators.required],
      name: [null, Validators.required],
      user: [null, Validators.required],
      password: [null, Validators.required],
      cpf: [null, Validators.required],
      email: [null, Validators.required],
      billingAddress: this.fb.group({
        cep: [null],
        street: [null],
        streetNumber: [null],
        neighborhood: [null],
        state: [null],
        city: [null],
        country: [null]
      }),
      maillingAddress: this.fb.group({
        cep: [null],
        street: [null],
        streetNumber: [null],
        neighborhood: [null],
        state: [null],
        city: [null],
        country: [null]
      })
    })

    if(this.registerForm.controls.profile.value) { 
      this.profileType = 'cliente'
    }
    console.log(this.registerForm)
    this.onChangesProfileForm()
    this.onChangesCepForm()
  }

  onChangesProfileForm() {
    this.registerForm.controls.profile.valueChanges.subscribe(val => {
      this.profileType = val;
      console.log(val);
    });
  }

  onChangesCepForm() {
    this.registerForm.controls.billingAddress.valueChanges.subscribe(val => {
      if( val.cep.length == 8){
        this.cepIsValid = true
        //TODO: incluir a chamada pra o backend verificar se o cep é valido
        console.log(val);
      } else {
        this.cepIsValid = false
      }
      // this.profileType = val;
      
    });
  }

  /* usado para saber se deseja utilizar o mesmo endereco de cobranca para entrega */
  getCheckboxValue(event){
    if(event.originalTarget.value == "sim") {
      this.registerForm.get("maillingAddress").setValue({
        cep: this.registerForm.get(['billingAddress', 'cep']).value ,
        street: this.registerForm.get(['billingAddress', 'street']).value,
        streetNumber: this.registerForm.get(['billingAddress', 'streetNumber']).value,
        neighborhood: this.registerForm.get(['billingAddress', 'neighborhood']).value,
        state: this.registerForm.get(['billingAddress', 'state']).value,
        city: this.registerForm.get(['billingAddress', 'city']).value,
        country: this.registerForm.get(['billingAddress', 'country']).value
      })    
    } 
    this.selectedMaillingType = true
  }

  createUser() {
    this.authService.registerNewUser(this.registerForm.value).subscribe(response => {
      console.log("Resposta", response)
    })

  }

}
