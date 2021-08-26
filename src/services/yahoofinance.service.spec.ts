import { TestBed } from '@angular/core/testing';

import { YahoofinanceService } from './yahoofinance.service';

describe('YahoofinanceService', () => {
  let service: YahoofinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YahoofinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
