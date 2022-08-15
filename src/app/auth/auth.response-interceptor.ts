import { Router } from '@angular/router'
import { AxiosError } from 'axios'

import { IHttpClient } from 'src/common/http-client'

import { AuthService } from './auth.service'

export class AuthResponseInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly httpClient: IHttpClient,
    private readonly router: Router,
  ) {}

  public initializeInterceptor(): void {
    this.httpClient.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error?.response?.status === 401) {
          this.authService.clearUser();
          this.router.navigate(['/login']);
        }
        console.error(error);
      }
    )
  }
}
