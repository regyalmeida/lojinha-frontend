import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-users-screen',
  templateUrl: './users-screen.component.html',
  styleUrls: ['./users-screen.component.scss']
})
export class UsersScreenComponent implements OnInit {

  profile: string

  administrador: boolean = false
  cliente: boolean = false
  estoquista: boolean = false
  produto: boolean = false

  recoveredUsers: any

  constructor(private authService: AuthService) { }

  ngOnInit() {
    
  }

  changeView(view) {
    console.log(view)
    if(view == 'administrador'){
      this.administrador = true
      this.cliente = false
      this.estoquista = false
      this.produto = false
    }
    else if(view == 'cliente'){
      this.administrador = false
      this.cliente = true
      this.estoquista = false
      this.produto = false
    } 
    else if(view == 'estoquista'){
      this.administrador = false
      this.cliente = false
      this.estoquista = true
      this.produto = false
    }
    else {
      this.administrador = false
      this.cliente = false
      this.estoquista = false
      this.produto = true
    }
    this.recover(view)
  }

  recover(params){
    this.authService.recoverUsers(params).subscribe((complete) => {
      
      this.recoveredUsers = complete.data
      console.log(this.recoveredUsers)
    }, (err) => {
      console.log(err)      
    });
  }

}
