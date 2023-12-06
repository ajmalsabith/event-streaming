import { TestBed } from '@angular/core/testing';

import { FullserviceService } from './fullservice.service';

describe('FullserviceService', () => {
  let service: FullserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
