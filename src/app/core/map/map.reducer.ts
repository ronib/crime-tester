import { MapState } from './map.models';
import { authLogin, authLogout } from './map.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: MapState = {
  isAuthenticated: false
};

const reducer = createReducer(
  initialState,
  on(authLogin, state => ({ ...state, isAuthenticated: true })),
  on(authLogout, state => ({ ...state, isAuthenticated: false }))
);

export function mapReducer(
  state: MapState | undefined,
  action: Action
): MapState {
  return reducer(state, action);
}