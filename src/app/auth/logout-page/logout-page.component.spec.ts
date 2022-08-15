import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { httpClientToken, AxiosHttpClient } from 'src/common/http-client';

import { LogoutPageComponent } from './logout-page.component';

describe('LogoutPageComponent', () => {
  let component: LogoutPageComponent;
  let fixture: ComponentFixture<LogoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ LogoutPageComponent ],
      providers: [
        { provide: httpClientToken, useValue: AxiosHttpClient },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
