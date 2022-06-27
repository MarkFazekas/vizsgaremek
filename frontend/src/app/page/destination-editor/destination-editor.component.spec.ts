import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationEditorComponent } from './destination-editor.component';

describe('DestinationEditorComponent', () => {
  let component: DestinationEditorComponent;
  let fixture: ComponentFixture<DestinationEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
