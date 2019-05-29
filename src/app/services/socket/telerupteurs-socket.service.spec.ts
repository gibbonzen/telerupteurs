import { TestBed } from '@angular/core/testing';

import { TelerupteursSocketService } from './telerupteurs-socket.service';
import { SocketService } from './socket.service';

describe('SocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TelerupteursSocketService = TestBed.get(SocketService);
    expect(service).toBeTruthy();
  });
});
