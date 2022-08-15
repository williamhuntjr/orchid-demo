import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { httpClientToken, AxiosHttpClient } from 'src/common/http-client';

import { CameraDashboardComponent } from './camera-dashboard.component';

describe('CameraDashboardComponent', () => {
  let component: CameraDashboardComponent;
  let fixture: ComponentFixture<CameraDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraDashboardComponent ],
      providers: [
        { provide: httpClientToken, useValue: AxiosHttpClient },
        MatSnackBar,
        Overlay
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
