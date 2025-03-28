import { TestBed } from '@angular/core/testing';

import { ClientNavbarService } from './client-navbar.service';

describe('ClientNavbarService', () => {
  let service: ClientNavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientNavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
