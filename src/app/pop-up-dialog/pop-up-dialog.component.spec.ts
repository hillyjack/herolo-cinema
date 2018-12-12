import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpDialogComponent } from './pop-up-dialog.component';

describe('PopUpDialogComponent', () => {
  let component: PopUpDialogComponent;
  let fixture: ComponentFixture<PopUpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
