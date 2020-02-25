import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { EmailValidator } from '@angular/forms';


@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  errorMessage: any = false;
  loginUser: string;
  passwordUser: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const auth = this.authService.getAuth();
    auth ?
      this.router.navigate(['/home'])

      : null;
  }

  loginAuth(password, email) {
    if (password.length > 0 && email.length > 0) {
      this.callInfoAuth(password, email);
      this.errorMessage = false;
    } else {
      this.errorMessage = "Preencha todos os campos";
    }
  }

  callInfoAuth(password, user) {
    const params = {
      user,
      password
    };
    this.authService.getAllInfo(params).subscribe((complete) => {
      console.log(complete)
      if (complete.autenticado) {
        this.authService.setAuth({ user });
        this.router.navigate(['/home']);
      }
    }, (err) => {
      console.log(err)
      this.errorMessage = "Login inválido, verifique os campos!";
    });
  }
}