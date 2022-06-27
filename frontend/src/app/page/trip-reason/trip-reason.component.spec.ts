import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripReasonComponent } from './trip-reason.component';

describe('TripReasonComponent', () => {
  let component: TripReasonComponent;
  let fixture: ComponentFixture<TripReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
