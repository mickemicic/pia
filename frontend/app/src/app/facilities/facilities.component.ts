import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Business } from 'models/business';
import { DialogComponent } from '../dialog/dialog.component';
import { FacilitiesAddComponent } from '../facilities-add/facilities-add.component';
import { BusinessService } from '../services/business.service';


@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements AfterViewInit {

  tableData = JSON.parse(localStorage.getItem("user")).inventory;

  displayedColumns: string[] = ['erase', 'code', 'title', 'unit', 'tax', 'producer', 'edit'];
  dataSource = new MatTableDataSource<InventoryItem>(this.tableData);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(FacilitiesAddComponent) child;
  
  constructor(private router: Router, public dialog: MatDialog, private service: BusinessService) { }
  
  ngAfterViewInit(): void {
    this.show = false;
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
    console.log(this.user)
  }

  user: Business;
  length: Number;
  show: Boolean;


  erase(item){
    let dialogRef = this.dialog.open(DialogComponent);
      dialogRef.afterClosed().subscribe(res=>{
        if(res){
          this.service.erase(item, this.user.username).subscribe((resp=>{
            if(resp['message']=='item removed'){
              this.service.getUserPIB(this.user.pib).subscribe((res: Business)=>{
                this.user = res})

              localStorage.removeItem("user");
              console.log(JSON.parse(localStorage.getItem("user")))
              localStorage.setItem("user", JSON.stringify(this.user))
              console.log(this.user)
              //window.location.reload();
            }
          
          }))
        }
      })
  }

  edit(item){
    localStorage.setItem("item", JSON.stringify(item));
    this.router.navigate(['itemEdit'])
  }

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
