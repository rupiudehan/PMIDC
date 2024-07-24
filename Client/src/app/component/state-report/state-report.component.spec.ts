import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateReportComponent } from './state-report.component';

describe('StateReportComponent', () => {
  let component: StateReportComponent;
  let fixture: ComponentFixture<StateReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StateReportComponent]
    });
    fixture = TestBed.createComponent(StateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
