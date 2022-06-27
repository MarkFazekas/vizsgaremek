import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerEditorComponent } from './partner-editor.component';

describe('PartnerEditorComponent', () => {
  let component: PartnerEditorComponent;
  let fixture: ComponentFixture<PartnerEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
