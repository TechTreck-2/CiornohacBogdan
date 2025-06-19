import { TestBed } from '@angular/core/testing';

import { TimeTableService } from './time-table-service.service';

describe('TimeTableServiceService', () => {
  let service: TimeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
