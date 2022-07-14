import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'models/business';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-check-confirm',
  templateUrl: './check-confirm.component.html',
  styleUrls: ['./check-confirm.component.css']
})
export class CheckConfirmComponent implements OnInit {

  constructor(private router: Router, private service: BusinessService) { }

  ngOnInit(): void {
    this.sumPr = 0;
    this.message="";
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
  
    this.sumCh = 0
    this.user = user;
    this.check = JSON.parse(localStorage.getItem("check"))
    this.check.forEach(element => {
      this.sumCh += (element.count*element.sellPrice)
      });
      this.orderers = this.user.orderers;
      this.obrada = false;

  }

  sumCh: number  

  orderers: Array<any>
  message: String

  user: Business

  check: any
  payment: String
  val: number
  idNum: number

  buyer:string
  slip:number

  sumPr: number

  ord: number

  obrada: boolean;
  cashBack: number

  today: Date

  process(){
    this.message=""
    switch(this.payment){
      case("cash"):
      if(this.val<this.sumCh || this.val == undefined){
        this.message="Недовољно готовине"
        return;
      }
      this.obrada=true;
      this.cashBack = this.val - this.sumCh
      this.today = new Date()
      break;

      case("card"):
      break;

      case("cheque"):
      break;

      case("vir"):
      break;
    }
  }

  confirm(){
    localStorage.setItem("output.pib", JSON.stringify(this.user.pib));
    localStorage.setItem("output.date", JSON.stringify(this.today));
    localStorage.setItem("output.buyer", JSON.stringify(this.idNum));
    localStorage.setItem("output.sum", JSON.stringify(this.sumCh));
    localStorage.setItem("userN", JSON.stringify(this.user.title));
    console.log(this.user.title)
    this.service.confirmCh().subscribe((res=>{
      if(res['message']=="ch added"){
        alert("Рачун је успешно додат.")
        localStorage.removeItem("output.buyer");
        localStorage.removeItem("output.sum");
        localStorage.removeItem("output.pib");
        localStorage.removeItem("output.date");
        localStorage.removeItem("userN");
        localStorage.removeItem("check");
      }
      else{
        alert("Грешка. Покушајте поново.")
      }
      this.router.navigate([''])
    }))
  }
}
