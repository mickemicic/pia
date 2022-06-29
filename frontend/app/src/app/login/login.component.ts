import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { User } from 'models/user';
import { BusinessService } from '../services/business.service';

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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private businessService: BusinessService, private router: Router) { }

  ngOnInit(): void {
    this.hide = true;
  }

  username: string;
  password: string;

  message: string;
  hide: boolean;

  usernameFormControl = new FormControl('', Validators.required);
  passFormControl = new FormControl('', Validators.required);

  matcher = new MyErrorStateMatcher();

  login(){

    if(this.password == null || this.username == null){
      this.message = "Молимо унесите све податке."
      return;
    }

    this.businessService.login(this.username, this.password).subscribe((user: User)=>{
      if(user){
        if(user.type==-1){
          this.router.navigate(['/business/new']);
        }
        else if(user.type==1){
          this.router.navigate(['/business']);
        }
        else if (user.type==2){
          this.router.navigate(['/user']);
        }
      }
      else this.message= "Некоректни подаци.";
    })
  }

}
