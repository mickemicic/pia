import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAccControlComponent } from './custom-acc-control.component';

describe('CustomAccControlComponent', () => {
  let component: CustomAccControlComponent;
  let fixture: ComponentFixture<CustomAccControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomAccControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAccControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
