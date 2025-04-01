import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { loginRequest, loginSuccess, loginFailure, refreshTokenRequest, refreshTokenSuccess, refreshTokenFailure, logout, AuthLoginResponse, AuthRefreshTokenResponse } from './login.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginRequest),
      exhaustMap(({ credentials }) =>
        this.authService.loginUser(credentials).pipe(
          map((loginSuccessResponse: AuthLoginResponse) => {
            return loginSuccess({ loginSuccessResponse });
          }),
          catchError((error) => {
            console.log('Erreur lors de la connexion:', error);
            const errorMessage = error.message || 'Erreur lors de la connexion';
            return of(loginFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect( ()=>
    this.actions$.pipe(
      ofType(loginSuccess),
      tap(({loginSuccessResponse})=>{
        console.log('Login success' , loginSuccessResponse.user)
      })

    ),{ dispatch: false }
  )


  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshTokenRequest),
      exhaustMap(({ refresh_token }) =>
        this.authService.refreshToken(refresh_token).pipe(
          map((refreshTokenResponse: AuthRefreshTokenResponse) => {
            return refreshTokenSuccess({ refreshTokenResponse });
          }),
          catchError((error) => {
            console.log('Erreur lors du rafraîchissement d\'access:', error);
            const errorMessage = error.message || 'Erreur lors du rafraîchissement d\'access';
            return of(refreshTokenFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  refreshTokenSuccess$ = createEffect(()=>
  this.actions$.pipe(
    ofType(refreshTokenSuccess),
    tap(({refreshTokenResponse})=>{
      console.log('Token refreshed successfuly')
    })
  ),{ dispatch: false })

  refreshTokenFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshTokenFailure),
      map(() => logout())
    )
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailure),
        tap(({ error }) => {
          console.log('Login failed:', error);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          console.log('Logging out user');
        })
      ),
    { dispatch: false }
  );
}