import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesAddComponent } from './facilities-add.component';

describe('FacilitiesAddComponent', () => {
  let component: FacilitiesAddComponent;
  let fixture: ComponentFixture<FacilitiesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitiesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitiesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
