import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { ValidationService } from '../../services/validation/validation.service';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-screen',
  templateUrl: './users-screen.component.html',
  styleUrls: ['./users-screen.component.scss']
})
export class UsersScreenComponent implements OnInit {

  profile: string

  updateForm: FormGroup

  administradorView: boolean = false
  clienteView: boolean = false
  estoquistaView: boolean = false
  produto: boolean = false
  recoveredUsers: any
  userProfile
  username
  user:any

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder, 
    private validationService: ValidationService) { 
  }
  
  ngOnInit() {
    const objLogin = this.authService.getProfile();
    this.userProfile = objLogin.profile;
    const username = this.authService.getAuth()
    this.username = username.user
    if(this.userProfile == 'cliente') this.recoverOneUser(this.username)
    console.log(this.userProfile)
    console.log(objLogin)
    
    this.updateForm = this.fb.group({
      id: [null],
      profile: ['cliente' ],
      name: [null ],
      user: [null ],
      password: [null ],
      cpf: [null ],
      email: [null ],
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
  }

  changeView(view) {
    console.log(view)
    if(view == 'administradorView'){
      this.administradorView = true
      this.clienteView = false
      this.estoquistaView = false
      this.produto = false
    }
    else if(view == 'clienteView'){
      this.administradorView = false
      this.clienteView = true
      this.estoquistaView = false
      this.produto = false
    } 
    else if(view == 'estoquistaView'){
      this.administradorView = false
      this.clienteView = false
      this.estoquistaView = true
      this.produto = false
    }
    else {
      this.administradorView = false
      this.clienteView = false
      this.estoquistaView = false
      this.produto = true
    }
    this.recover(view)
  }
  

  recover(params){
    if(params == 'administradorView') params = "administrador"
    else if(params == 'estoquistaView') params = "estoquista"
    else params = "cliente"
    this.authService.recoverUsers(params).subscribe((complete) => {
      this.recoveredUsers = complete.data
      console.log(this.recoveredUsers)
    }, (err) => {
      console.log(err)      
    });
  }

  recoverOneUser(username){
    //recoverOneUser
    this.authService.recoverOneUser(username).subscribe((complete) => {
      this.recoveredUsers = complete.data
      this.appendUserToForm(complete.data[0])
      console.log(this.recoveredUsers)
    }, (err) => {
      console.log(err)      
    });
  }

  appendUserToForm(user){
this.updateForm.patchValue({
  id: user._id,
  name: user.name,
  user: user.user,
  password: user.password,
  cpf: user.cpf,
  email: user.email,
  billingAddress: {
    cep: user.billingAddress.cep,
    street: user.billingAddress.street,
    streetNumber: user.billingAddress.streetNumber,
    neighborhood: user.billingAddress.neighborhood,
    state: user.billingAddress.state,
    city: user.billingAddress.city,
    country:user.billingAddress.country  ,
  },
  maillingAddress: {
    cep: user.maillingAddress.cep,
    street: user.maillingAddress.street,
    streetNumber:user.maillingAddress.streetNumber ,   
    neighborhood:user.maillingAddress.neighborhood ,   
    state:user.maillingAddress.state    ,
    city: user.maillingAddress.city,
    country: user.maillingAddress.country,
  }
})
  }
  deleteUser(user) {
    this.authService.deleteUser(user).subscribe(response => {
      console.log('response do delete', response)

    })
  }
  registerNewUser(){
    this.router.navigate(['/novo/usuario']);
  }

  updateUser(){
    console.log(this.updateForm.value)
    this.authService.updateUser(this.updateForm.value).subscribe(response => {
      console.log('response do delete', response)

    })
  }

}
