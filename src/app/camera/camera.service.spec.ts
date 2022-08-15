import { TestBed } from '@angular/core/testing';

import { httpClientToken, AxiosHttpClient } from 'src/common/http-client';
import { CameraService } from './camera.service';

describe('CameraService', () => {
  let service: CameraService;
  let httpClientSpy: jasmine.SpyObj<typeof AxiosHttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: httpClientToken, useValue: AxiosHttpClient }], 
    }).compileComponents();
    // Create an empty jasmine spy (builtin to Angular's test suite)
    httpClientSpy = jasmine.createSpyObj(httpClientSpy, ['get']);

    // Instantiate your CameraService with the fake HttpClient
    service = new CameraService(httpClientSpy);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('#getFrame', () => {
  let httpClientSpy: jasmine.SpyObj<typeof AxiosHttpClient>;
  let service: CameraService;

  beforeEach(() => {
    // Create an empty jasmine spy (builtin to Angular's test suite)
    httpClientSpy = jasmine.createSpyObj(httpClientSpy, ['get']);

    // Instantiate your CameraService with the fake HttpClient
    service = new CameraService(httpClientSpy);
  });

  it('returns expected data', async function () {
    // Create your test data
    const expected = new Blob([])

    // This mocks the return from httpClient so that you're not making an actual network call.
    // That helps to isolate your test and reduce flakiness
    httpClientSpy.get.and.returnValue(new Promise((resolve) => resolve(expected)));

    // Call the method you're wanting to test. The parameter doesn't matter. Just pick a number
    const actual = await service.getFrame(1);

    // Make assertions on the result
    expect(actual instanceof Blob).toEqual(expected instanceof Blob);
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});

describe('#getCameras', () => {
  let httpClientSpy: jasmine.SpyObj<typeof AxiosHttpClient>;
  let service: CameraService;

  beforeEach(() => {
    // Create an empty jasmine spy (builtin to Angular's test suite)
    httpClientSpy = jasmine.createSpyObj(httpClientSpy, ['get']);

    // Instantiate your CameraService with the fake HttpClient
    service = new CameraService(httpClientSpy);
  });

  it("should retrieve list of cameras in an array", async () => {
    const expected = [
      {id: 0, name: 'Camera 1', primaryStream: {id: 0, href: ''}},
      {id: 1, name: 'Camera 2', primaryStream: {id: 1, href: ''}}
    ]
  
    httpClientSpy.get.and.returnValue(new Promise((resolve) => resolve(expected)));
  
    const actual = await service.getCameras();
  
    actual.forEach((camera) => {
      expect(camera.id).toBeDefined();
      expect(camera.name).toBeDefined();
      expect(camera.primaryStream).toBeDefined();
      expect(typeof(camera.id)).toBe('number');
      expect(typeof(camera.name)).toBe('string');
      expect(typeof(camera.primaryStream)).toBe('object');
    })
  
    expect(actual).toEqual(expected);
  });
});
