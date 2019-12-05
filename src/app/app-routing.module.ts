import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './features/map/map.component';
import { CameraComponent } from './features/camera/camera.component';
import {CasesComponent} from './features/cases/cases.component';


const routes: Routes = [
  { path: '',
    redirectTo: '/map',
    pathMatch: 'full'
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'camera',
    component: CameraComponent
  },
  {
    path: 'cases',
    component: CasesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
