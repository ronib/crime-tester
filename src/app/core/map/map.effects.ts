import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { authLogin, authLogout } from './map.actions';
import { HttpClient, } from '@angular/common/http';

export const MAP_KEY = 'MAP';

@Injectable()
export class MapEffects {
  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  login = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogin),
        tap(() =>
          this.httpClient.get(MAP_KEY)
        )
      ),
    { dispatch: false }
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
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