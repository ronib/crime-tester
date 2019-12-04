import { MapState } from './map.models';
import { loadMapData, mapAddMarker } from './map.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: MapState = {
  data: null
};

const reducer = createReducer(
  initialState,
  on(loadMapData, state => ({ ...state, data: true })),
  on(mapAddMarker, state => ({ ...state, isAuthenticated: false }))
);

export function mapReducer(
  state: MapState | undefined,
  action: Action
): MapState {
  return reducer(state, action);
}