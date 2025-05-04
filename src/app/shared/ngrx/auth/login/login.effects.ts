import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { loginRequest, loginSuccess, loginFailure, refreshTokenRequest, refreshTokenSuccess, refreshTokenFailure, logout, AuthLoginResponse, AuthRefreshTokenResponse, User, fetchConnectedUser } from './login.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private authService = inject(AuthService);
  private router = inject(Router)
  login$ = createEffect(() => {
    const actions$ = inject(Actions); // Injecte Actions ici
    return actions$.pipe(
      ofType(loginRequest),
      exhaustMap(({ credentials }) =>
        this.authService.loginUser(credentials).pipe(
          map((loginSuccessResponse: AuthLoginResponse) => {
            console.log('loginSuccessResponse : ',loginSuccessResponse)
            return loginSuccess({ loginSuccessResponse });
          }),
          catchError((error) => {
            console.log('Erreur lors de la connexion :', error);
            const errorMessage = error.error.message || 'Erreur lors de la connexion';
            return of(loginFailure({ error: errorMessage }));
          })
        )
      )
    );
  });

  loginSuccess$ = createEffect(() => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(loginSuccess),
      switchMap(({ loginSuccessResponse }) =>
        this.authService.connectedUser().pipe(
          map((ConnectedUserResponse: User) => {
            return fetchConnectedUser({ ConnectedUserResponse });
          })
        )
      )
    );
  });

  fetchConnectedUser$ = createEffect(()=> {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(fetchConnectedUser),
      tap(()=>{
        this.router.navigateByUrl('client/home')
      })
    )
  }, { dispatch: false })


  refreshToken$ = createEffect(() => {
    const actions$ = inject(Actions);
    return actions$.pipe(
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
    );
  });

  refreshTokenSuccess$ = createEffect(() => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(refreshTokenSuccess),
      tap(({ refreshTokenResponse }) => {
        console.log('Token refreshed successfully');
      })
    );
  }, { dispatch: false });

  refreshTokenFailure$ = createEffect(() => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(refreshTokenFailure),
      map(() => logout())
    );
  });

  loginFailure$ = createEffect(() => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(loginFailure),
      tap(({ error }) => {
        console.log('Login failed:', error);
      })
    );
  }, { dispatch: false });

  logout$ = createEffect(() => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(logout),
      tap(() => {
        console.log('Logging out user');
        this.router.navigateByUrl('client/home')
      })
    );
  }, { dispatch: false });
}
