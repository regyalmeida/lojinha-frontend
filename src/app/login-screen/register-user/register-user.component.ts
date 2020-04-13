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
  registerForm: FormGroup;
  name: string
  user: string
  password: string
  profile: string
  registerfd = new FormData();
  userInfo: any;



  constructor(private http: HttpClient,private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: [null, Validators.required],
      user: [null, Validators.required],
      password: [null, Validators.required],
      profile: [null, Validators.required]
    })
  }

  createUser() {


    this.authService.registerNewUser(this.registerForm.value).subscribe(response => {
      console.log("Resposta", response)

    })

  }

}
