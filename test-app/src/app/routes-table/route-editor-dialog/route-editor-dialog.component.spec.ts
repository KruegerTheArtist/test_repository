import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteEditorDialogComponent } from './route-editor-dialog.component';

describe('RouteEditorDialogComponent', () => {
  let component: RouteEditorDialogComponent;
  let fixture: ComponentFixture<RouteEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteEditorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
