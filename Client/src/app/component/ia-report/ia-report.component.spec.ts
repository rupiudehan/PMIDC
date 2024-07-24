import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaReportComponent } from './ia-report.component';

describe('IaReportComponent', () => {
  let component: IaReportComponent;
  let fixture: ComponentFixture<IaReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IaReportComponent]
    });
    fixture = TestBed.createComponent(IaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
