import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { CameraComponent } from './camera/camera.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    MapComponent,
    CameraComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [MapComponent, CameraComponent]
})
export class MapModule { }
