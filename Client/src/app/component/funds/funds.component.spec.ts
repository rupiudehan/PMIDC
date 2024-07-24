import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsComponent } from './funds.component';

describe('FundsComponent', () => {
  let component: FundsComponent;
  let fixture: ComponentFixture<FundsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundsComponent]
    });
    fixture = TestBed.createComponent(FundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
