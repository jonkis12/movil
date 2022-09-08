import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import{Router, NavigationExtras} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;

  user={
    usuario:"",
    password:""
  }




  constructor(public fb: FormBuilder,
    private router: Router) {
    this.formularioLogin = this.fb.group({
      'user': new FormControl('', Validators.required),
      'contra': new FormControl('', Validators.required),
    });
    
  }

  ngOnInit() {}

  ingresar(){

    let navigationExtras:NavigationExtras={

      state:{
        user:this.user
      }
    };
    this.router.navigate(['/taller'],navigationExtras)
  }
}
