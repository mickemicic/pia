import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'models/business';
import { BusinessService } from '../services/business.service';

export interface Orderer{
  PIB: number;
  title: String;
  address: String;
  category: String;
  days: number;
  tax: number;
}

@Component({
  selector: 'app-orderers',
  templateUrl: './orderers.component.html',
  styleUrls: ['./orderers.component.css']
})
export class OrderersComponent implements OnInit {

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

      if(user.orderers != null){
        this.orderersPIB = user.orderers;
        for (let index = 0; index < this.orderersPIB.length; index++) {
          this.service.getUserPIB(this.orderersPIB[index]).subscribe((business: Business)=>{
            if(business){
              this.orderers[index].PIB = this.orderersPIB[index];
              this.orderers[index].address = business.address;
              this.orderers[index].title = business.title;
              this.orderers[index].category = business.category;
            }
          })          
        }
      }

  }

  user: Business;
  orderersPIB: Array<number>;
  orderers: Array<Orderer>;

}
