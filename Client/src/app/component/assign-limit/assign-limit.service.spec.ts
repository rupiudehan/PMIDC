import { TestBed } from '@angular/core/testing';

import { AssignLimitService } from './assign-limit.service';

describe('AssignLimitService', () => {
  let service: AssignLimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignLimitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
