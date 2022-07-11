import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDataStorageComponent } from './business-data-storage.component';

describe('BusinessDataStorageComponent', () => {
  let component: BusinessDataStorageComponent;
  let fixture: ComponentFixture<BusinessDataStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessDataStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDataStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
