import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { loadMapData, mapAddMarker } from './map.actions';
import { MapService } from 'src/app/features/map.service';

export const MAP_KEY = 'MAP';

@Injectable()
export class MapEffects {
  constructor(
    private actions$: Actions,
    private mapService: MapService,
    private router: Router
  ) {}

  login = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadMapData),
        tap(() =>
          this.mapService.get(MAP_KEY)
        )
      ),
    { dispatch: false }
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(mapAddMarker),
        tap(() => {
          this.router.navigate(['']);
        //   this.localStorageService.setItem(AUTH_KEY, {
        //     isAuthenticated: false
        //   });
        })
      ),
    { dispatch: false }
  );
}