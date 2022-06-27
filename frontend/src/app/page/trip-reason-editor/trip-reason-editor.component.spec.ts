import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripReasonEditorComponent } from './trip-reason-editor.component';

describe('TripReasonEditorComponent', () => {
  let component: TripReasonEditorComponent;
  let fixture: ComponentFixture<TripReasonEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripReasonEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripReasonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
