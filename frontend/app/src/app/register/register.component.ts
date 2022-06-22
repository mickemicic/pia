import { Component, OnInit } from '@angular/core';
import { Business } from 'models/business';
import { UserService } from '../services/user.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit(): void {
  }

  model: Business;

  odgLice: string;
  username: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  email: string;
  title: string;
  address: string;
  pib: number;
  matBr: number;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  register(){
    this.service.register(this.odgLice, this.username, this.password, this.passwordConfirm, this.phone, 
      this.email, this.title, this.address, this.pib, this.matBr).subscribe((resp=>{
        if(resp['message']=='user added'){
          alert('ok')
        }
        else{
          alert('prc')
        }
    }))
  }
}
