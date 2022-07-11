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
  selector: 'app-business-new',
  templateUrl: './business-new.component.html',
  styleUrls: ['./business-new.component.css']
})
export class BusinessNewComponent implements OnInit {

  constructor(private router: Router, private service: BusinessService) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem("loggedIn"))==true){
      this.user = JSON.parse(localStorage.getItem("user"));
      switch(this.user.type){
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
    else
      this.router.navigate(['']);

      this.numSeq = new Array(1).fill(0);
      this.numSeqW = new Array(1).fill(0);
  }

  matcher = new MyErrorStateMatcher();


  catFormControl = new FormControl('', [Validators.required]);
  actFormControl = new FormControl('', [Validators.required]);
  accFormControl = new FormControl('', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]);

  numRegister: number;
  numWarehouse: number;

  activities: Array<String>;
  pdv: boolean;
  category: string;
  accNum: number;

  message: string;

  user: Business = JSON.parse(localStorage.getItem("user"));

  numSeq: Array<number>;
  numSeqW: Array<number>;

  kaseL: Array<String>;
  kaseT: Array<String>;

  skladistaId: Array<String>;
  skladistaNaz: Array<String>;


  numSequence(){
    this.numSeq = new Array<number>(0);      

    this.kaseL = new Array<String>("");      
    this.kaseT = new Array<String>("");  
         
    for (let index = 0; index < this.numRegister; index++) {
      this.numSeq.push(index);
      this.kaseL.push("");
      this.kaseT.push("");
    } 
  }


  numSequenceW(){
    this.numSeqW = new Array<number>(0);

    this.skladistaId = new Array<String>("");      
    this.skladistaNaz = new Array<String>(""); 

    for (let index = 0; index < this.numWarehouse; index++) {
      this.numSeqW.push(index);
      this.skladistaId.push("");
      this.skladistaNaz.push("");
    } 
  }

  extraInfo(){
    if( this.category == null || this.accNum == null || this.numRegister==null || this.numWarehouse==null){
      this.message = "Сва поља су обавезна.";
      return;
    }

    this.kaseL.forEach(element => {
      if(element=="")
      this.message = "Сва поља су обавезна.";
      console.log("PROBLEM")
      return;
    });

    this.kaseT.forEach(element => {
      if(element=="")
      this.message = "Сва поља су обавезна.";
      console.log("PROBLEM")
      return;
    });

    this.skladistaId.forEach(element => {
      if(element=="")
      this.message = "Сва поља су обавезна.";
      console.log("PROBLEM")
      return;
    });

    this.skladistaNaz.forEach(element => {
      if(element=="")
      this.message = "Сва поља су обавезна.";
      console.log("PROBLEM")
      return;
    });

    this.service.extraInfo(this.category, this.activities, this.pdv, this.accNum, this.user.username, this.kaseL, this.kaseT, this.skladistaId, this.skladistaNaz).subscribe((resp=>{
      console.log(resp['message']);
      if(resp['message']=='data updated'){
        this.user.type = 1;
        localStorage.setItem("user", JSON.stringify(this.user));
        alert("Успешно сте додали податке");

        this.router.navigate(['']);
      }
      else{
        alert('Дошло је до грешке, молимо покушајте касније.');
        this.service.logout();
      }
    }))
  }

}
