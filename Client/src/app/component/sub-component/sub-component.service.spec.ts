import { TestBed } from '@angular/core/testing';

import { SubComponentService } from './sub-component.service';

describe('SubComponentService', () => {
  let service: SubComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
