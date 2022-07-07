import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAccComponent } from './custom-acc.component';

describe('CustomAccComponent', () => {
  let component: CustomAccComponent;
  let fixture: ComponentFixture<CustomAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomAccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
