import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraDashboardComponent } from './camera-dashboard/camera-dashboard.component';
import { CameraCardComponent } from './camera-card/camera-card.component';

@NgModule({
  declarations: [
    CameraDashboardComponent,
    CameraCardComponent
  ],
  imports: [
    CommonModule
  ]
})

export class CameraModule { }
