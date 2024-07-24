import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLimitComponent } from './assign-limit.component';

describe('AssignLimitComponent', () => {
  let component: AssignLimitComponent;
  let fixture: ComponentFixture<AssignLimitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignLimitComponent]
    });
    fixture = TestBed.createComponent(AssignLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
