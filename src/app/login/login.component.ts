import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { AuthService } from "../core/services/auth.service";
import {LoginResponse} from "../models/login-response.model";

import {ToasterService} from "../core/services/toaster.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  constructor(private fb:FormBuilder,private _AuthService:AuthService, private toasterService:ToasterService, private router:Router) {
    this.loginForm = this.fb.group({
      email:['admin@gmail.com',[Validators.required,Validators.email,Validators.pattern(/.+\@.+\..+/)]],
      password:['admin@123',[Validators.required]]
    })
  }

  ngOnInit() {

  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  onSubmit():void{
    const email = this.email?.value;
    const password = this.password?.value;

    this._AuthService.login(email,password).subscribe({
      next:(res:LoginResponse) => {
        this.toasterService.showSuccess("Logged in successfully");
        this.router.navigate(["/home"])
      },
      error:(err) => {
        this.toasterService.showError("Login failed")        
      }
    })
  }
}
