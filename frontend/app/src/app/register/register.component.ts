import { Component, OnInit } from '@angular/core';
import { Business } from 'models/business';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from 'models/user';
import { BusinessService } from '../services/business.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  constructor(private service: BusinessService, private router: Router, private http: HttpClient) { }

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
  logo: string;

  ima: number;


  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
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

  file: File;
  name: string;
  imgH: number;
  imgW: number;

  isImageSaved: boolean;

  onFileSelected(fileInput) {

    if (fileInput.target.files && fileInput.target.files[0]) {
      this.file = fileInput.target.files[0];
      this.name = this.file.name;

      const max_height = 300;
      const max_width = 300;
      const min_height = 100;
      const min_width = 100;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          this.imgH = img_height;
          this.imgW = img_width;

          console.log(img_height, img_width);


          if (img_height > max_height || img_width > max_width) {
            this.message = "Максималне димензије слике су 300px*300px"
          } else if(img_height < min_height || img_width < min_width){
            this.message = "Минималне димензије слике су 100px*100px"
          } 
          else {
              const imgBase64Path = e.target.result;
              this.logo = imgBase64Path;
              this.isImageSaved = true;
              console.log(this.logo);
              // this.previewImagePath = imgBase64Path;
          }
        };
      };

        reader.readAsDataURL(fileInput.target.files[0]);
    }


    // this.file = event.target.files[0];
    // this.path = event.target.files[0].name;
    // console.log(this.file)
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

    this.service.getUser(this.username).subscribe((user: Business)=>{
      if(user){
        this.message = "Корисничко име је заузето.";
        return;
      }
    })

    this.service.getUserM(this.email).subscribe((user: Business)=>{
      if(user){
        this.message = "Већ постоји налог са унетом е-поштом.";
        return;
      }
    })

    if(this.file == undefined){
      this.message = "Морате одабрати лого предузећа.";
      return;
    }

    if (this.imgH > 300 || this.imgW > 300) {
      this.message = "Максималне димензије слике су 300px*300px"
      return;
    } else if(this.imgH < 100 || this.imgW < 100){
      this.message = "Минималне димензије слике су 100px*100px"
      return;
    } 

    this.service.register(this.odgLice, this.username, this.password, this.passwordConfirm, this.phone, 
      this.email, this.title, this.address, this.pib, this.matBr, this.logo).subscribe((resp=>{
        if(resp['message']=='user added'){
          alert('Захтев за регистрацију је успешно послат.');
        }
        else{
          alert('Дошло је до грешке, молимо покушајте касније.');
        }
        this.router.navigate(['']);
    }))
  }

}
