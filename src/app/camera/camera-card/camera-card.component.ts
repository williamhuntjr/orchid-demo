import { 
  Component, 
  OnInit, 
  Input,
  ChangeDetectorRef
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { CameraService } from 'src/app/camera/camera.service';

@Component({
  selector: 'camera-card',
  templateUrl: './camera-card.component.html',
  styleUrls: ['./camera-card.component.sass']
})
export class CameraCardComponent implements OnInit {
  @Input() cameraName: string;
  @Input() cameraId: number|null;
  @Input() streamId: number|null;

  blobData: Blob;
  blobUrl: SafeUrl;
  isFetching: boolean;
  isLoading: boolean;
  currentDate = Date.now();

  constructor(private cameraService: CameraService, private sanitizer: DomSanitizer, private cdRef: ChangeDetectorRef) {
    this.isLoading = true;
    this.isFetching = true;
    this.blobUrl = '';
    this.blobData = new Blob();
    this.cameraName = '';
    this.cameraId = null;
    this.streamId = null;
   }

  async fetchImage(): Promise<void> {
    if (this.streamId) {
      this.isFetching = true;

      this.blobData = await this.cameraService.getFrame(this.streamId);
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.blobData));

      this.isFetching = false;
      this.cdRef.detectChanges();
    }
  }

  async ngOnInit(): Promise<void> {
    await this.fetchImage();
    this.isLoading = false;
  }
}
