import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
  AppState,
  reducers,
  metaReducers,
} from './core.state';
import { environment } from 'src/environments/environment';
import { MapEffects } from './map/map.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      MapEffects,
    ]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'Crime Tester'
        }),
  ]
})
export class CoreModule { }
