import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Business } from 'models/business';



@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements AfterViewInit {

  tableData = JSON.parse(localStorage.getItem("user")).inventory;

  displayedColumns: string[] = ['code', 'title', 'unit', 'tax', 'producer'];
  dataSource = new MatTableDataSource<InventoryItem>(this.tableData);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private router: Router) { }
  
  ngAfterViewInit(): void {
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

      this.dataSource.paginator = this.paginator
    
    this.user = user;
    this.tableData = new Array<InventoryItem>();
    this.tableData = user.inventory;
    this.length = this.tableData.length;
  }

  user: Business;
  length: Number;
}
export interface InventoryItem {
  code: number;
  title: string;
  unit: string;
  tax: number;
  producer: string
}


// const DATADATA: InventoryItem[] = [
//   {"code" : 335,
//   "title" : "stolice",
//   "unit" : "komad",
//   "tax" : 23,
//   "producer" : "Forma Ideale"},
//   {"code" : 335,
//   "title" : "stolice",
//   "unit" : "komad",
//   "tax" : 23,
//   "producer" : "Forma Ideale"},
//   {"code" : 335,
//   "title" : "stolice",
//   "unit" : "komad",
//   "tax" : 23,
//   "producer" : "Forma Ideale"},
//   {"code" : 335,
//   "title" : "stolice",
//   "unit" : "komad",
//   "tax" : 23,
//   "producer" : "Forma Ideale"},
//   {"code" : 335,
//   "title" : "stolice",
//   "unit" : "komad",
//   "tax" : 23,
//   "producer" : "Forma Ideale"},
//   {"code" : 335,
//   "title" : "stolice",
//   "unit" : "komad",
//   "tax" : 23,
//   "producer" : "Forma Ideale"},
//   {"code" : 335,
//   "title" : "stolice",
//   "unit" : "komad",
//   "tax" : 23,
//   "producer" : "Forma Ideale"},
//   {"code" : 335,
//   "title" : "stolice",
//   "unit" : "komad",
//   "tax" : 23,
//   "producer" : "Forma Ideale"},
//   {"code" : 335,
//   "title" : "stolice",
//   "unit" : "komad",
//   "tax" : 23,
//   "producer" : "Forma Ideale"},
//   {"code" : 335,
//   "title" : "stolice",
//   "unit" : "komad",
//   "tax" : 23,
//   "producer" : "Forma Ideale"},
//   {"code" : 335,
//   "title" : "stolice",
//   "unit" : "komad",
//   "tax" : 23,
//   "producer" : "Forma Ideale"},
//   {"code" : 335,
//   "title" : "stolice",
//   "unit" : "komad",
//   "tax" : 23,
//   "producer" : "Forma Ideale"},
//   {"code" : 335,
//   "title" : "stolice",
//   "unit" : "komad",
//   "tax" : 23,
//   "producer" : "Forma Ideale"},
//   {"code" : 335,
//   "title" : "stolice",
//   "unit" : "komad",
//   "tax" : 23,
//   "producer" : "Forma Ideale"},
//   {"code" : 335,
//   "title" : "stolice",
//   "unit" : "komad",
//   "tax" : 23,
//   "producer" : "Forma Ideale"},
//   {"code" : 335,
//   "title" : "stolice",
//   "unit" : "komad",
//   "tax" : 23,
//   "producer" : "Forma Ideale"},
//   {"code" : 335,
//   "title" : "stolice",
//   "unit" : "komad",
//   "tax" : 23,
//   "producer" : "Forma Ideale"}
// ];
