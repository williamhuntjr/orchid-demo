import { Inject, Injectable } from '@angular/core';

import { IHttpClient, httpClientToken } from 'src/common/http-client';

import { ICamera, ICameraList } from './camera.types';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  constructor(@Inject(httpClientToken) private httpClient: IHttpClient) { }

  public async getCameras(): Promise<ICamera[]> {
    const resp = await this.httpClient.get<ICameraList>('/cameras');
    return resp?.data?.cameras ?? [];
  }

  public async getFrame(streamId: number): Promise<Blob> {
    const resp = await this.httpClient.get(`/streams/${streamId}/frame`, { params: { width: 400, height: 400 }, responseType: "blob" });
    if (resp && resp.data) {
      return new Blob([resp.data], {type:'image/jpg'});
    }
    return new Blob();
  }
}
