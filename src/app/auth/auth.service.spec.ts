import { TestBed } from '@angular/core/testing';

import { httpClientToken, AxiosHttpClient } from 'src/common/http-client';
import { IUser } from 'src/app/auth/auth.types'
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: httpClientToken, useValue: AxiosHttpClient },
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
