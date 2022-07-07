import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';
import { CustomAccComponent } from '../custom-acc/custom-acc.component';


@Component({
  selector: 'app-custom-acc-control',
  templateUrl: './custom-acc-control.component.html',
  styleUrls: ['./custom-acc-control.component.css'],
  providers: [{
    provide: MatFormFieldControl,
    useExisting: CustomAccComponent
  }]
})
export class CustomAccControlComponent implements OnInit, MatFormFieldControl<Number> {

  constructor() { }
  value: Number;
  stateChanges: Observable<void> = new Subject();
  id: string;
  placeholder: string;
  ngControl: NgControl;
  focused: boolean;
  empty: boolean;
  shouldLabelFloat: boolean;
  required: boolean;
  disabled: boolean;
  errorState: boolean;
  controlType?: string;
  autofilled?: boolean;
  userAriaDescribedBy?: string;
  setDescribedByIds(ids: string[]): void {
    //throw new Error('Method not implemented.');
  }
  onContainerClick(event: MouseEvent): void {
    //throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
