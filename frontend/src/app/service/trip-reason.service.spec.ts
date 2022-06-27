import { TestBed } from '@angular/core/testing';

import { TripReasonService } from './trip-reason.service';

describe('TripReasonService', () => {
  let service: TripReasonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripReasonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
