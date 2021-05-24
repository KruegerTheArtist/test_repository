import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesTableComponent } from './routes-table.component';

describe('RoutesTableComponent', () => {
  let component: RoutesTableComponent;
  let fixture: ComponentFixture<RoutesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
