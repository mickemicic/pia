import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Business } from 'models/business';
import { DialogComponent } from '../dialog/dialog.component';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-business-data-storage',
  templateUrl: './business-data-storage.component.html',
  styleUrls: ['./business-data-storage.component.css']
})
export class BusinessDataStorageComponent implements OnInit {

  constructor(private router: Router, private service: BusinessService, public dialogK: MatDialog) { }

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

    this.error = 0;

    this.kaseL = user.kase.lokacija;
    this.kaseT = user.kase.tip;

    this.skladistaId = user.skladista.id;
    this.skladistaNaz = user.skladista.naziv;

    this.numSeq = new Array<number>(0);
    this.numSeqW = new Array<number>(0);

    var n = 0;

    this.skladistaId.forEach(element => {
      this.numSeqW.push(n++)
    });

    n = 0;
    this.kaseL.forEach(element => {
      this.numSeq.push(n++)
    });

  }

  user: Business;

  kaseL: Array<String>;
  kaseT: Array<String>;

  skladistaId: Array<String>;
  skladistaNaz: Array<String>;

  numSeq: Array<number>;
  numSeqW: Array<number>;

  message: String;
  messageK: String;

  error: number;

  update(){
    this.error = 0;
    this.kaseL.forEach(element => {
      if(element == undefined || element == ""){
        this.message = "Унесите податке за све касе.";
        this.error = 1;
      }
      
    });
    this.kaseT.forEach(element => {
      if(element == undefined || element == ""){
        this.message = "Унесите податке за све касе.";
        this.error = 1;
      }
    });
    this.skladistaId.forEach(element => {
      if(element == undefined || element == ""){
        this.message = "Унесите податке за сва складишта.";
        this.error = 1;
      }
    });
    this.skladistaNaz.forEach(element => {
      if(element == undefined || element == ""){
        this.message = "Унесите податке за сва складишта.";
        this.error = 1;
      }
    });

    if(this.error == 1)
      return;

    this.service.updateStorage(this.kaseL, this.kaseT, this.skladistaNaz, this.skladistaId, this.user.username).subscribe((resp=>{
      if(resp['message']=='storage updated'){
        alert('Успешно сте изменили податке.');
        this.user.skladista.id = this.skladistaId;
        this.user.skladista.naziv = this.skladistaNaz;
        this.user.kase.lokacija = this.kaseL;
        this.user.kase.tip = this.kaseT;
        localStorage.setItem("user", JSON.stringify(this.user));

        this.router.navigate(['business']);
      }
      else{
        alert('Дошло је до грешке, молимо покушајте касније.');
        this.router.navigate(['']);
      }
    }))
  }

  addS(){
    this.skladistaId.push("");
    this.skladistaNaz.push("");
    this.numSeqW.push(this.numSeqW.length);
  }

  addK(){
    this.kaseL.push("");
    this.kaseT.push("");
    this.numSeq.push(this.numSeq.length)
  }


  removeK(n){
    if(this.kaseL[n]!="" || this.kaseT[n]!=""){
      let dialogRef = this.dialogK.open(DialogComponent);
      dialogRef.afterClosed().subscribe(res=>{
        if(res=="true"){
          this.kaseL.splice(n, 1);
          this.kaseT.splice(n, 1);
          this.numSeq.pop();
        }
    })
    }else{
      this.kaseL.splice(n, 1);
      this.kaseT.splice(n, 1);
      this.numSeq.splice(n, 1);
    }
  }

  removeS(n){
    if(this.skladistaId[n]!="" || this.skladistaNaz[n]!=""){
      let dialogRef = this.dialogK.open(DialogComponent);
      dialogRef.afterClosed().subscribe(res=>{
        if(res=="true"){
          this.skladistaId.splice(n, 1);
          this.skladistaNaz.splice(n, 1);
          this.numSeqW.pop();
        }
    })
    }else{
      this.skladistaId.splice(n, 1);
      this.skladistaNaz.splice(n, 1);
      this.numSeqW.pop();
    }
  }

}

