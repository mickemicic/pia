import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'models/business';
import { BusinessService } from '../services/business.service';

class ItemsInt{
  title: string;
  unit: string;
  tax: number;
  sellPrice: number;
  count: number;

  constructor(title: string, unit: string, tax: number, sellPrice: number){
    this.title = title;
    this.unit = unit;
    this.tax = tax;
    this.sellPrice = sellPrice
  }
}

@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent implements OnInit {

  constructor(private router: Router, private service: BusinessService) { }

  ngOnInit(): void {
    localStorage.removeItem("check")
    this.sumPr = 0;
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

      this.show=false;
      this.showC=false;
      this.user = user;
      this.skladistaNaz = this.user.skladista.naziv;
      this.skladistaId = this.user.skladista.id
      this.quant = new Array<number>()
      this.check = new Array<ItemsInt>()
      this.messages = new Array<string>()
      this.prices = new Array<number>()
      this.showConf = false;
      this.tableSet = false;
  }

  user: Business

  skladistaNaz: Array<String>
  skladistaId: Array<String>
  skladiste: number

  showConf: boolean

  items: Array<ItemsInt>
  show: boolean;
  showC: boolean;

  currItem: ItemsInt

  quant: Array<number>
  check: Array<ItemsInt>

  messages:Array<string>;
  prices:Array<number>;

  sumPr:number;

  getWItems(){
    this.show = true;
    this.items = new Array<ItemsInt>()
    // this.service.getItems(this.user, this.skladiste).subscribe(((items: Array<Inventory>)=>{
    //   if(items){
    //     this.items = items;
    //     this.show = true;
    //   }
    // }))
    this.shows = new Array<boolean>()
    this.user.inventory.forEach(element => {
      console.log(element)
      console.log(this.skladiste)
      this.currItem = new ItemsInt(element.title, element.unit, element.tax, element.sellPrice[this.skladiste]);
      this.items.push(this.currItem)
      this.messages.push("")
      this.prices.push(0)
      this.shows.push(false)
      console.log(this.items)
    });
  }

  shows: Array<boolean>

  tableSet: boolean;
  message: string;

  addToCheck(element, index){
    if(this.user.restaurant == 1){
      if(this.tableNum == -1){
        this.user.tables.forEach(element => {
          if(element.taken == false && this.tableSet == false){
            this.tableSet = true;
            this.tableNum = element.id;
            element.taken = true;
          }
        });
        if(this.tableNum == -1){
          this.message = "Тренутно нема слободних столова, молимо сачекајте."
          this.router.navigate(['']);
        }
      }

    }
    this.messages[index] = ""
    if(this.quant[index]==undefined || this.quant[index]<=0){
      this.messages[index] = "Морате унети валидну количину."
      return;
    }
    this.shows[index] = true;
    this.showC = true;

    this.currItem = new ItemsInt(element.title, element.unit, element.tax, element.sellPrice);
    this.currItem.count = this.quant[index];
    this.prices[index] = this.currItem.count*this.currItem.sellPrice;

    this.check.push(this.currItem);
    this.sumPr+=this.prices[index]
    console.log(this.prices)
    console.log(this.sumPr)

    this.showConf = true;
  }

  removeFromCheck(element, index){
    this.shows[index] = false;
    this.quant[index] = undefined
    for (let i = 0; i < this.check.length; i++) {
      if(element.title == this.check[i].title){
        this.check.splice(i, 1)
      }
    }
    this.sumPr-=this.prices[index];
    this.prices.splice(index, 1)

    if(this.check.length == 0)
      this.showConf = false;
  }

  tableNum: number;

  racunConfirm(){
    console.log(this.check)
    localStorage.setItem("check", JSON.stringify(this.check));
    if(this.tableNum > -1){
      localStorage.setItem("check.table", JSON.stringify(this.tableNum));
      this.user.tables.forEach(element => {
        if(element.id == this.tableNum)
          element.taken = false;
      });
    }
    this.router.navigate(['checkConfirmation'])
  }

}


