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
  selector: 'app-orderers-add',
  templateUrl: './orderers-add.component.html',
  styleUrls: ['./orderers-add.component.css']
})
export class OrderersAddComponent implements OnInit {

  constructor(public service: BusinessService, private router: Router) { }

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
  }


  message: String;
  pib: number;

  business: Business;
  category: String;

  user: Business;

  pibF: number;
  title: string;
  address: string;
  categoryF: string;
  odgLice: string;
  phone: string;

  messageF: string;



  search(){
    this.message="";
    if(this.pib==this.user.pib){
      this.message="Не можете додати своје предузеће као наручиоца."
      return;
    }
    this.service.searchPIB(this.pib).subscribe((business: Business)=>{
      if(business){
        this.business = business;
        if (business.category == "hosp")
          this.category="Ресторан"
        else
          this.category="Продавница"
      }
      else{
        this.message = "Нема резултата за дату претрагу."
      }
    })
  }

  addOrderer(){
    this.message="";
    let orderer = new Orderer(this.business.pib, this.business.title, this.business.address,
      this.business.category, this.business.logo, this.business.odgLice, this.business.phone);
    this.service.addOrderer(this.user, orderer).subscribe((resp)=>{
      if(resp['message'] == "orderer added"){
        this.user.orderers.push(orderer);
        localStorage.setItem("user", JSON.stringify(this.user));
        alert("Наручилац успешно додат!");
        this.router.navigate(['orderers'])
      }
      else if(resp['message'] == "existing orderer"){
        this.message = "Дати наручилац већ постоји у Вашој листи."
      }
      else{
        alert("Дошло је до грешке, покушајте касније.")
        this.router.navigate(['orderers'])
      }
      
    })

  }

  addOrd(){
    this.messageF="";
    if(this.address == undefined || this.pibF == undefined || this.address == undefined || this.title == undefined || this.categoryF == undefined || this.odgLice == undefined || this.phone == undefined){
      this.messageF="Сви подаци су обавезни.";
      return;
    }
    let orderer = new Orderer(this.pibF, this.title, this.address,
      this.categoryF, null, this.odgLice, this.phone);
      this.service.addOrderer(this.user, orderer).subscribe((resp)=>{
        if(resp['message'] == "orderer added"){
          this.user.orderers.push(orderer);
          localStorage.setItem("user", JSON.stringify(this.user));
          alert("Наручилац успешно додат!");
          this.router.navigate(['orderers'])
        }
        else if(resp['message'] == "existing orderer"){
          this.message = "Дати наручилац већ постоји у Вашој листи."
        }
        else{
          alert("Дошло је до грешке, покушајте касније.")
          this.router.navigate(['orderers'])
        }
        
      })
  }
}
