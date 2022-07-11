import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Business } from 'models/business';
import { BusinessService } from '../services/business.service';


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
  selector: 'app-business-data-basic',
  templateUrl: './business-data-basic.component.html',
  styleUrls: ['./business-data-basic.component.css']
})
export class BusinessDataBasicComponent implements OnInit {

  constructor(private service: BusinessService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem("loggedIn"))==true){
      var user = JSON.parse(localStorage.getItem("user"));
      switch(user.type){
        case(-1):
          this.router.navigate(['/businessNew']);
          break;
        case(-2):
          this.router.navigate(['/businessInactive']);
          break;
        case(2):
          this.router.navigate(['/user']);
          break;
        case(0):
          this.router.navigate(['/admin']);
          break;
      }
    }
    else
      this.router.navigate(['']);

      this.user = user;
      this.odgLice = user.odgLice;
      this.phone = "+" + user.phone;
      this.email = user.email;
      this.emailB = user.email;
  }

  odgLice: string;
  phone: string;
  email: string;
  phoneP: string;
  emailB: string;

  user: Business;

  message: string;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required, Validators.pattern(/([A-Z]{1}[a-z]+[ ]*)+/)]);
  phoneFormControl = new FormControl('', [Validators.required, Validators.pattern(/^(\+)(381)([0-9]){7,10}/)]);

  matcher = new MyErrorStateMatcher();

  update() {
    this.service.getUserM(this.email).subscribe((user: Business)=>{
      if(user)
        if(user.username!=this.user.username){
          this.message = "Већ постоји налог са унетом е-поштом.";
          return;
        }
        
      if(this.odgLice == "")
        this.odgLice = user.odgLice;
      if(this.phone.toString() == "")
        this.phone = user.phone.toString();
      if(this.email == "")
        this.email = this.emailB;


      this.phoneP = this.phone.substring(1)
      
      this.service.update(this.odgLice, this.phoneP, this.email, this.user.username).subscribe((resp=>{
        if(resp['message']=='user updated'){
          alert('Успешно сте изменили податке.');
          this.user.odgLice = this.odgLice;
          this.user.phone = this.phoneP;
          this.user.email = this.email;

          localStorage.setItem("user", JSON.stringify(this.user));

          this.router.navigate(['business']);
        }
        else{
          alert('Дошло је до грешке, молимо покушајте касније.');
          this.router.navigate(['']);
        }
      }))
    })
  }
}
