import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { CameraComponent } from './camera/camera.component';
import {FormsModule} from '@angular/forms';
import {CasesComponent} from './cases/cases.component';

@NgModule({
  declarations: [
    MapComponent,
    CameraComponent,
    CasesComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [MapComponent, CameraComponent]
})
export class MapModule { }
