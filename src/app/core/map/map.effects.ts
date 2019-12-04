import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { loadMapData, mapAddMarker } from './map.actions';
import { MapService } from 'src/app/features/map.service';

@Injectable()
export class MapEffects {
  constructor(
    private actions$: Actions,
    private mapService: MapService,
    private router: Router
  ) {}

  // login = createEffect(
  //   () =>
  //     // this.actions$.pipe(
  //     //   ofType(loadMapData),
  //     //   concatMap(() =>
  //     //     this.mapService.get(environment.dataUrl)
  //     //   ),
  //     //   map((results) => {
  //     //     console.log(results);
  //     //     return mapLoaded({ users, adMode, gridConfigRequest });
  //     // })
  //     // ),
  // );

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