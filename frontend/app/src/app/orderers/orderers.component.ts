import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'models/business';
import { BusinessService } from '../services/business.service';

class Orderer{
  PIB: number;
  title: String;
  address: String;
  category: String;
  days: number;
  tax: number;
  logo: String;
  odgLice: String;
  phone: String;

  constructor(PIB: number, title: String, address: String, category: String, logo: String, odgLice: String, phone: String){
    this.PIB = PIB;
    this.title = title;
    this.address = address;
    this.category = category;
    this.logo = logo;
    this.odgLice = odgLice;
    this.days = -1;
    this.tax = -1;
    this.phone = phone
  }
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
      this.days = new Array<number>();
      this.tax = new Array<number>();
      this.messages = new Array<String>();

      if(user.orderers != null){
        this.orderers = new Array<Orderer>();
        this.orderers = user.orderers;
      }

      this.orderers.forEach(element => {
        this.days.push(element.days)
        this.tax.push(element.tax)
      });

  }

  currOrd: Orderer;
  user: Business;
  orderersPIB: Array<number>;
  orderers: Array<Orderer>;

  days: Array<number>;
  tax: Array<number>

  messages: Array<String>;


  updateOrderer(i){
    this.messages[i] = "";
    if(this.days[i]<=0 || this.days[i] == undefined || this.tax[i]<=0 || this.tax[i]>=100 || this.tax[i] == null){
      this.messages[i] = "Морате унети коректне податке."
      return;
    }
    
    console.log(this.orderers)
    console.log(i)
    console.log(this.currOrd)

    this.currOrd = this.orderers[i];
    this.currOrd.tax = this.tax[i];
    this.currOrd.days = this.days[i];
    this.orderers[i] = this.currOrd;

    this.service.updateOrd(this.orderers[i], this.user).subscribe((resp)=>{
      if(resp['message']=="orderer updated"){
        alert(`Подаци о наручиоцу ${this.currOrd.title} су успешно измењени`)
      }
      else{
        alert("Дошло је до грешке, покушајте касније.")
        this.router.navigate(['orderers'])
      }
    })
  }
}
