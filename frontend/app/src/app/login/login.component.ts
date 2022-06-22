import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  message: string;

  login(){
    this.userService.login(this.username, this.password).subscribe((user: User)=>{
      if(user){
        if (user.type==0){
          this.router.navigate(['/admin']);
        }
        else if (user.type==1){
          this.router.navigate(['/user']);
        }
        else{
          this.router.navigate(['/business']);
        }
      }
      else this.message= "Bad data.";
    })
  }
}
