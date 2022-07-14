import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Business } from 'models/business';
import { InventoryItem } from '../facilities/facilities.component';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  tableData = JSON.parse(localStorage.getItem("user")).inventory;

  displayedColumns: string[] = ['code', 'title', 'unit', 'tax', 'producer', 'add'];
  dataSource = new MatTableDataSource<InventoryItem>(this.tableData);

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
    this.show = false;
  }
  user: Business
  show: boolean

  message: String
  query: String

  currSelection: String;

  check(c){
    this.show = true;
    this.currSelection = c;
    this.message = "Додаје се у категорију " + c
  }

  add(element){
    this.service.addCategory(this.user.username, element, this.currSelection).subscribe((resp)=>{
      if(resp['message'] == "category updated"){
        alert("Артикал успешно додат у категорију")
      }
      else{
        alert("Дошло је до грешке, покушајте касније")
        this.router.navigate([''])
      }
    })
  }
}
