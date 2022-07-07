import { Component, OnInit } from '@angular/core';
import { Business } from 'models/business';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  
  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem("loggedIn")))
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  user: Business;
}
