import { TestBed } from '@angular/core/testing';

import { TopCardsService } from './top-cards.service';

describe('TopCardsService', () => {
  let service: TopCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
