import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'models/business';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-business-data-accounts',
  templateUrl: './business-data-accounts.component.html',
  styleUrls: ['./business-data-accounts.component.css']
})
export class BusinessDataAccountsComponent implements OnInit {

  constructor(private router: Router, private service: BusinessService) { }

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
      this.accNum = user.accNum;
  }

  user: Business;
  accNum: number;
  
  update(){
    if(this.accNum == null)
      this.router.navigate(['']);

      this.service.updateAcc(this.accNum, this.user.username).subscribe((resp=>{
        if(resp['message']=='acc updated'){
          alert('Успешно сте изменили податке.');
          this.user.accNum = this.accNum;

          localStorage.setItem("user", JSON.stringify(this.user));

          this.router.navigate(['business']);
        }
        else{
          alert('Дошло је до грешке, молимо покушајте касније.');
          this.router.navigate(['']);
        }
      }))
    
  }
}
