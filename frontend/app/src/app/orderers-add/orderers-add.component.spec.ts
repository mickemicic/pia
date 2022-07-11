import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderersAddComponent } from './orderers-add.component';

describe('OrderersAddComponent', () => {
  let component: OrderersAddComponent;
  let fixture: ComponentFixture<OrderersAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderersAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
