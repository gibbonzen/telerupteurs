import { TestBed } from '@angular/core/testing';

import { TelerupteursService } from './telerupteurs.service';

describe('TelerupteursService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TelerupteursService = TestBed.get(TelerupteursService);
    expect(service).toBeTruthy();
  });
});
