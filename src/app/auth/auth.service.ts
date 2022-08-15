import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { IHttpClient, httpClientToken } from 'src/common/http-client';

import { IUser } from './auth.types';
import { userStorageKey } from './auth.constants';
import { AuthRequestInterceptor } from './auth.request-interceptor'
import { AuthResponseInterceptor } from './auth.response-interceptor'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(httpClientToken) private httpClient: IHttpClient, private router: Router) {
    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  public getCurrentUser(): IUser | null {
    const user = localStorage.getItem(userStorageKey);
    return user ? JSON.parse(user) : null;
  }

  public getUsername(): string | null {
    const user = this.getCurrentUser();
    return user?.name ?? null;
  }

  public async login(username: string, password: string): Promise<void> {
    const params = { username, password };
    const resp = await this.httpClient.post<IUser>('/sessions/user', params);
    if (resp.data) {
      const newUserData = {
        ...resp.data,
        loginTimestamp: Date.now()
      };
      this.setUser(newUserData);
    }
  }

  public clearUser(): void {
    localStorage.removeItem(userStorageKey);
  }

  private setUser(user: IUser): void {
    localStorage.setItem(userStorageKey, JSON.stringify(user));
  }

  public getToken(): string | null {
    const user = this.getCurrentUser();
    return user && user.id ? user.id : null;
  }

  public checkToken(): void {
    const user = this.getCurrentUser();

    if (user?.loginTimestamp) {
      const expiredOn = user.loginTimestamp + (user.expiresIn * 1000);
      if (Date.now() > expiredOn) {
        this.clearUser();
        this.router.navigate(['/login']);
      }
    }
  }
  
  private initializeRequestInterceptor(): void {
    const requestInterceptor = new AuthRequestInterceptor(this, this.httpClient);
    requestInterceptor.initializeInterceptor();
  }

  private initializeResponseInterceptor(): void {
    const responseInterceptor = new AuthResponseInterceptor(this, this.httpClient, this.router);
    responseInterceptor.initializeInterceptor();
  }
}
