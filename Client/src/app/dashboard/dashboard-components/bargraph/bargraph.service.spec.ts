import { TestBed } from '@angular/core/testing';

import { BargraphService } from './bargraph.service';

describe('BargraphService', () => {
  let service: BargraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BargraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
