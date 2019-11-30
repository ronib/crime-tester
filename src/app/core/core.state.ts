import {
    ActionReducerMap,
    MetaReducer,
    createFeatureSelector
  } from '@ngrx/store';
    
  import { environment } from '../../environments/environment';
  
  import { debug } from './meta-reducers/debug.reducer';
  import { MapState } from './map/map.models';
  import { mapReducer } from './map/map.reducer';
  
  
  export const reducers: ActionReducerMap<AppState> = {
    map: mapReducer,
  };
  
  export const metaReducers: MetaReducer<AppState>[] = [
    //initStateFromLocalStorage
  ];
  
//   if (!environment.production) {
//     if (!environment.test) {
//       metaReducers.unshift(debug);
//     }
//   }
  
  export const selectMapState = createFeatureSelector<AppState, MapState>(
    'map'
  );
    
  export interface AppState {
    map: MapState;
  }