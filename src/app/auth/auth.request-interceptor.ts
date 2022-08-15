import { IHttpClient } from 'src/common/http-client'

import { AuthService } from './auth.service'

export class AuthRequestInterceptor {
  constructor(private readonly authService: AuthService, private readonly httpClient: IHttpClient) {}

  public initializeInterceptor(): void {
    this.httpClient.interceptors.request.use(
      (config) => {
        const updatedConfig = { ...config };
        if (updatedConfig.headers) {
          // Add the content type header only when appropriate
          if (config.method === 'POST' || config.method === 'PATCH' || config.method === 'PUT') {
            updatedConfig.headers['Content-Type'] = 'application/json';
          }

          const token = this.authService.getToken()
          // we the requests for the refresh url will add the refresh token
          // so we avoid adding the access token here
          if (token && config.url) {
            updatedConfig.headers['Authorization'] = 'Bearer ' + token;
          }
        }
        return updatedConfig;
      },
      (error) => Promise.reject(error)
    )
  }
}
