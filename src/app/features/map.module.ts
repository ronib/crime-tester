import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { CameraComponent } from './camera/camera.component';
import {FormsModule} from '@angular/forms';
import {CasesComponent} from './cases/cases.component';
import { CarusalComponent } from './carusal/carusal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventItemComponent } from './event-item/event-item.component';
import { MatCard, MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    MapComponent,
    CameraComponent,
    CasesComponent,
    CarusalComponent,
    EventItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    MatCardModule
  ],
  exports: [MapComponent, CameraComponent]
})
export class MapModule { }
