import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../auth.service';
import { httpClientToken, AxiosHttpClient } from 'src/common/http-client';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        Overlay,
        FormBuilder,
        MatSnackBar,
        MatButton,
        { provide: httpClientToken, useValue: AxiosHttpClient },
      ], 
      imports: [MatButtonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call auth login method', async() => {
    let loginSpy, authService;

    const debugElement = fixture.debugElement;

    authService = debugElement.injector.get(AuthService);
    loginSpy = spyOn(authService , 'login').and.callThrough();

    // to set values
    component.loginForm.controls['username'].setValue('user');
    component.loginForm.controls['password'].setValue('123');

    const loginButton = await loader.getHarness(MatButtonHarness.with({selector: '.loginPageButton'}));
    expect(await loginButton.isDisabled()).toBe(false);

    await loginButton.click();

    expect(loginSpy).toHaveBeenCalledTimes(1); // check that service is called once
   });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
