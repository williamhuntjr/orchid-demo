import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatMenuModule } from '@angular/material/menu';

import { httpClientToken, AxiosHttpClient } from 'src/common/http-client';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatMenuModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      providers: [
        { provide: httpClientToken, useValue: AxiosHttpClient },
      ],
    }).compileComponents();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
