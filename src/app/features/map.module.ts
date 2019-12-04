import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { CameraComponent } from './camera/camera.component';

@NgModule({
  declarations: [
    MapComponent,
    CameraComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [MapComponent, CameraComponent]
})
export class MapModule { }
