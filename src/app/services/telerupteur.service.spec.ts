import { TestBed } from '@angular/core/testing';

import { TelerupteurService } from './telerupteur.service';

describe('TelerupteurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TelerupteurService = TestBed.get(TelerupteurService);
    expect(service).toBeTruthy();
  });
});
