import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDataAccountsComponent } from './business-data-accounts.component';

describe('BusinessDataAccountsComponent', () => {
  let component: BusinessDataAccountsComponent;
  let fixture: ComponentFixture<BusinessDataAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessDataAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDataAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
