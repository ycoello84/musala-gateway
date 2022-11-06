import { TestBed } from '@angular/core/testing';

import { TitlecardService } from './titlecard.service';

describe('TitlecardService', () => {
  let service: TitlecardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitlecardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
