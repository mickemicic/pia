import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'models/business';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: BusinessService, private router: Router) { }

  
  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem("loggedIn")))
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  user: Business;

  logout(){
    this.service.logout();
    this.router.navigate(['']);
  }
}
