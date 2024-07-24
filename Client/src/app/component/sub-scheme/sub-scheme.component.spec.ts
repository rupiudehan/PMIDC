import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSchemeComponent } from './sub-scheme.component';

describe('SubSchemeComponent', () => {
  let component: SubSchemeComponent;
  let fixture: ComponentFixture<SubSchemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubSchemeComponent]
    });
    fixture = TestBed.createComponent(SubSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
