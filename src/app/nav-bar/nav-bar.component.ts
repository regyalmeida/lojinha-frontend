import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Output() data = new EventEmitter()


  userName: any;
  clickOnButton: boolean = false

  profile: string

  constructor(private activatedRouter: ActivatedRoute, private authService: AuthService, private router: Router) {
    const objLogin = this.authService.getAuth();
    if(objLogin) this.userName = objLogin.user;
  }

  ngOnInit() {
    this.profile = this.authService.getProfile()
    if(this.profile) this.profile = this.authService.getProfile().profile 
    console.log("O perfil é de:  ", this.profile)
  }
  
  login() {
    this.router.navigate(['/login']);
  }

  exit() {
    window.localStorage.clear();
    this.router.navigate(['/']);
  }

  limparValor() {
    location.reload()
  }


  go2Cart(){
    this.router.navigate(['/carrinho']);
  }


}
