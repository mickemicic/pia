import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'models/business';

@Component({
  selector: 'app-facilities-add',
  templateUrl: './facilities-add.component.html',
  styleUrls: ['./facilities-add.component.css']
})
export class FacilitiesAddComponent implements OnInit {

  constructor(private router: Router) { }

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

  user: Business;

  code: number;
  title: string;
  unit: string;
  tax: number;
  producer: string;

  origin: String;
  foreignTitle: String;
  barcode: number;
  customsTax: String;
  ecoTax: String;
  minStock: number;
  maxStock: number;
  description: String;
  declare: String;
  

  }

