import { TestBed } from '@angular/core/testing';

import { ClientNavigationService } from './client-navigation.service';

describe('ClientNavigationService', () => {
  let service: ClientNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
