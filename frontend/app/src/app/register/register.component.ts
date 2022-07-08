import { Component, OnInit } from '@angular/core';
import { Business } from 'models/business';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from 'models/user';
import { BusinessService } from '../services/business.service';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: BusinessService, private router: Router) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem("loggedIn"))==true){
      var user = JSON.parse(localStorage.getItem("user"));
      switch(user.type){
        case(-1):
          this.router.navigate(['/businessNew']);
          break;
        case(1):
          this.router.navigate(['/business']);
          break;
        case(2):
          this.router.navigate(['/user']);
          break;
        case(0):
          this.router.navigate(['/admin']);
          break;
      }
    }

    this.hide = true;
    this.hideC = true;
  }

  message: string;
  messageP: string;

  hide: boolean;
  hideC: boolean;

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
  path: string;

  ima: number;


  emailFormControl = new FormControl('', [Validators.required, Validators.email])
  passFormControl = new FormControl('', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}/)]);
  passCFormControl = new FormControl('', Validators.required);
  nameFormControl = new FormControl('', [Validators.required, Validators.pattern(/([A-Z]{1}[a-z]+[ ]*)+/)]);
  usernameFormControl = new FormControl('', Validators.required);
  titleFormControl = new FormControl('', Validators.required);
  addressFormControl = new FormControl('', Validators.required);
  pibFormControl = new FormControl('', Validators.required);
  matBrFormControl = new FormControl('', Validators.required);
  phoneFormControl = new FormControl('', [Validators.required, Validators.pattern(/^(\+)(381)([0-9]){7,10}/)]);


  //(\+)(381)([0-9]){7,10}


  //(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}

  //^([a-zA-Z]+)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,12}$


  matcher = new MyErrorStateMatcher();


  onFileSelected(event) {
    if(event.target.files.length > 0) 
     {
       this.path = event.target.files[0].name;
     }
   }



  register(){

    if(this.odgLice == null || this.username == null || this.password == null || this.phone == null|| this.passwordConfirm == null 
      ||  this.email == null || this.title == null || this.address == null || this.pib == null || this.matBr == null){
        this.message = "Сва поља су обавезна.";
        return;
    }

    if(this.password!=this.passwordConfirm){
      this.messageP = "Лозинке морају бити исте";
      return;
    }

    var reg = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}/;


    if(!reg.test(this.password)) {
      this.message = "Лозинка мора бити у одговарајућем формату.";
      return;
    }

    this.service.getUser(this.username).subscribe((user: User)=>{
      if(user){
        this.message = "Корисничко име је заузето.";
        return;
      }
    })

    this.service.getUserM(this.email).subscribe((user: User)=>{
      if(user){
        this.message = "Већ постоји налог са унетом е-поштом.";
        return;
      }
    })

    this.service.register(this.odgLice, this.username, this.password, this.passwordConfirm, this.phone, 
      this.email, this.title, this.address, this.pib, this.matBr).subscribe((resp=>{
        if(resp['message']=='user added'){
          alert('Захтев за регистрацију је успешно послат.');
        }
        else{
          alert('Дошло је до грешке, молимо покушајте касније.')
        }
        this.router.navigate[''];
    }))
  }

}
