import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-screen',
  templateUrl: './users-screen.component.html',
  styleUrls: ['./users-screen.component.scss']
})
export class UsersScreenComponent implements OnInit {

  profile: string

  administradorView: boolean = false
  clienteView: boolean = false
  estoquistaView: boolean = false
  produto: boolean = false
  recoveredUsers: any
  userProfile
  user:any

  constructor(private authService: AuthService,private router: Router) { 
  }
  
  ngOnInit() {
    const objLogin = this.authService.getProfile();
    this.userProfile = objLogin.profile;
    console.log(this.userProfile)
    console.log(objLogin)
    
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
  deleteUser(user) {
    this.authService.deleteUser(user).subscribe(response => {
      console.log('response do delete', response)

    })
  }
  registerNewUser(){
    this.router.navigate(['/novo/usuario']);
  }


}
