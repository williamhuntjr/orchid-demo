import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { httpClientToken, AxiosHttpClient } from 'src/common/http-client';
import { CameraCardComponent } from './camera-card.component';

describe('CameraCardComponent', () => {
  let component: CameraCardComponent;
  let debugElement: DebugElement;
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

    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
  });

  it('should call fetchImage', async () => {

    component.streamId = 1
    let expected = new Blob()

    fixture.detectChanges();  // onInit()

    const cameraService = jasmine.createSpyObj('CameraService', ['getFrame']);
    cameraService.getFrame.and.returnValue(of(expected));

    expect(component.blobData instanceof Blob).toBeTrue();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
