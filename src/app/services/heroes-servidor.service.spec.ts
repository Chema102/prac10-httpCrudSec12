import { TestBed } from '@angular/core/testing';

import { HeroesServidorService } from './heroes-servidor.service';

describe('HeroesServidorService', () => {
  let service: HeroesServidorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesServidorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
