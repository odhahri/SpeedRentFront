import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { loginRequest, loginSuccess } from './login.actions';
import { exhaustMap, map, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable ()
export class AuthEffects {
    constructor(
        private actions$: Actions, 
        private service: AuthService,
        private activeRoute: ActivatedRoute){

    }

    login$ = createEffect(() => this.actions$.pipe(
        ofType(loginRequest),
        exhaustMap(({credentials})=>{
            return this.service.login(credentials).pipe(
                switchMap ((loginSuccessResponse:any)=>{
                    return this.service.getConnectedUser(loginSuccessResponse.results.access_token).pipe(map ((user:any)=>{
                        loginSuccessResponse.user = user;
                        return loginSuccess({loginSuccessResponse});
                    }))

                })
            )
        })))

        loginSuccess$ = createEffect(
            () =>
              this.actions$.pipe(
                ofType(loginSuccess),
                tap(({ loginSuccessResponse }) => {
                  const currentPathRoot =
                    this.activeRoute.snapshot.firstChild &&
                    this.activeRoute.snapshot.firstChild.url[0].path;
                  let redirectPath;
                  for (let role of loginSuccessResponse.user.roles) {
                    // 
                  }
                  if (redirectPath) {
                  } else {
                  }
                })
              ),
            { dispatch: false }
          );
        
          secondaryloginSuccess$ = createEffect(
            () =>
              this.actions$.pipe(
                ofType(loginSuccess),
                tap(({ loginSuccessResponse }) => {})
              ),
            { dispatch: false }
          );
          
}