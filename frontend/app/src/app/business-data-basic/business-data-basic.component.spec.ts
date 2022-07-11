import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDataBasicComponent } from './business-data-basic.component';

describe('BusinessDataBasicComponent', () => {
  let component: BusinessDataBasicComponent;
  let fixture: ComponentFixture<BusinessDataBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessDataBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDataBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
