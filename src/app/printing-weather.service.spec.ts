import { TestBed } from '@angular/core/testing';

import { PrintingWeatherService } from './printing-weather.service';

describe('PrintingWeatherService', () => {
  let service: PrintingWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintingWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
