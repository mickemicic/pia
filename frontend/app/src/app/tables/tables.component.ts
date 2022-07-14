import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Business } from 'models/business';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(private router: Router, private service: BusinessService) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem("loggedIn"))==true){
    var user = JSON.parse(localStorage.getItem("user"));
    if(user.category != "hosp")
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
    this.tabs = this.user.tabs;
  }

  tabs = Array<string>();
  selected = new FormControl(0);
  flag : number;

  addTab(n) {
    this.flag = 0;
    if(this.tabs)
    this.tabs.forEach(element => {
      if(element == n)
        this.flag = 1;
    });
    if(!n || this.flag){
      alert("Унесите коректан назив распореда")
      return;
    }
    if(!this.tabs)
      this.tabs = new Array<string>()
    this.tabs.push(n);
    this.selected.setValue(this.tabs.length - 1);

    this.service.addTab(n, this.user).subscribe((resp=>{
      if(resp['message'] == 'tab added'){
        this.user.tabs = this.tabs
        localStorage.setItem("user", JSON.stringify(this.user));
      }
      else{
        alert("Дошло је до грешке, покушајте поново")
      }
    }))
    
  }

  removeTab(index: number) {
    this.service.removeTab(this.tabs[index], this.user).subscribe((resp=>{
      if(resp['message'] == 'tab removed'){
        this.user.tabs.splice(index, 1)
        localStorage.setItem("user", JSON.stringify(this.user));
      }
      else{
        alert("Дошло је до грешке, покушајте поново")
      }
    }))
  }

  user: Business
  title: String;
}
