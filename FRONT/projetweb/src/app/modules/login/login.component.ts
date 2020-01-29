import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { User } from '../../../models/user';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();
  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private api:ApiService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Email:[this.user.email, Validators.required],
      Mdp:[this.user.mdp, Validators.required],
    });
  }
  
  onSubmit(customerData) {
    
    if(this.loginForm.controls.Email.invalid || this.loginForm.controls.Mdp.invalid) {
      return;
    }
    this.user.email = customerData.Email;
    this.user.mdp = customerData.Mdp;

    this.api.postLogin(this.user).subscribe(res => {
      if(res.token != undefined){
        sessionStorage.setItem("token",res.token);
        alert("Vous etes connecté");
      }else{
        alert("Mauvais identifiant");
      }

    });    
  }

 
}
