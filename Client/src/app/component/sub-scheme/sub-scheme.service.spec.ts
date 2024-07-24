import { TestBed } from '@angular/core/testing';

import { SubSchemeService } from './sub-scheme.service';

describe('SubSchemeService', () => {
  let service: SubSchemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubSchemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
