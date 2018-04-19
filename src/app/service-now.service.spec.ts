import { TestBed, inject } from '@angular/core/testing';

import { ServiceNowService } from './service-now.service';

describe('ServiceNowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceNowService]
    });
  });

  it('should be created', inject([ServiceNowService], (service: ServiceNowService) => {
    expect(service).toBeTruthy();
  }));
});
