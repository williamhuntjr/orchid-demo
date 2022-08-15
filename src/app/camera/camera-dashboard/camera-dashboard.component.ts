import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Subscription, timer } from 'rxjs';  
import { 
  MatSnackBar
} from '@angular/material/snack-bar';

import { CameraService } from 'src/app/camera/camera.service';
import { ICamera } from 'src/app/camera/camera.types';
import { CameraCardComponent } from 'src/app/camera/camera-card/camera-card.component'

@Component({
  selector: 'app-camera-dashboard',
  templateUrl: './camera-dashboard.component.html',
  styleUrls: ['./camera-dashboard.component.sass']
})
export class CameraDashboardComponent implements OnInit {
  cameras: ICamera[];
  timerSubscription: Subscription|null; 
  isLoading: boolean;

  constructor(private cameraService: CameraService, private snackBar: MatSnackBar) { 
    this.cameras = [];
    this.timerSubscription = null;
    this.isLoading = true;
  }

  @ViewChildren(CameraCardComponent) components:QueryList<CameraCardComponent> | undefined;

  async ngOnInit(): Promise<void> {
    this.timerSubscription = timer(0, 5000).subscribe(async () => {
      await this.refreshFrames();
    });
    
    this.snackBar.open('Your camera streams are loading.', 'Okay', {
      duration: 5000,
    });
    this.cameras = await this.cameraService.getCameras();
  }

  async refreshFrames(): Promise<void> {
    if (this.components) {
      this.components.forEach((child) => { child.fetchImage() });
    }
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
    
}
