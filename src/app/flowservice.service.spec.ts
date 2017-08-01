import { TestBed, inject } from '@angular/core/testing';

import { FlowserviceService } from './flowservice.service';

describe('FlowserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlowserviceService]
    });
  });

  it('should be created', inject([FlowserviceService], (service: FlowserviceService) => {
    expect(service).toBeTruthy();
  }));
});
