import { ComponentFixture, TestBed } from '@angular/core/testing';

import { httpClientToken, AxiosHttpClient } from 'src/common/http-client';

import { CameraCardComponent } from './camera-card.component';

describe('CameraCardComponent', () => {
  let component: CameraCardComponent;
  let fixture: ComponentFixture<CameraCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraCardComponent ],
      providers: [
        { provide: httpClientToken, useValue: AxiosHttpClient },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
