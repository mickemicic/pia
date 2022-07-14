import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckConfirmComponent } from './check-confirm.component';

describe('CheckConfirmComponent', () => {
  let component: CheckConfirmComponent;
  let fixture: ComponentFixture<CheckConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
