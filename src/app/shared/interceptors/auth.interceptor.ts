import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, map, Observable, throwError } from "rxjs";
import { filter, take, takeLast, tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { privateUrls, publicUrls } from "./utils/routes.policy";
import { selectAccessToken, selectIsRefreshingToken, selectRefreshToken } from "../ngrx/auth/login/login.selectors";
import { AuthRefreshTokenResponse, logout, refreshTokenRequest, refreshTokenSuccess } from "../ngrx/auth/login/login.actions";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    public store = inject(Store);
    private authService = inject(AuthService);
    publicUrls: Array<string>;
    privateUrls: Array<string>;

    constructor(private activeRoute: ActivatedRoute, private router: Router) {
        this.publicUrls = publicUrls;
        this.privateUrls = privateUrls;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Treat public URLs (no token needed)
        if (this.publicUrls.includes(request.url)) {
            return next.handle(request).pipe(
                tap((response: HttpEvent<any>) => {
                    if (response instanceof HttpResponse){
                        console.log('Public url request processed successfuly')
                    }
                
                }),
                catchError((error: HttpErrorResponse) => {
                    if (error instanceof ProgressEvent) {
                        console.error('Server not responding, please check your connectivity')
                        return throwError(() => error);
                    }
                    console.error(error.message)
                    return throwError(() => error);
                })
            );
        } else {
            // Treat private URLs (token required)
            if (this.privateUrls.includes(request.url)) {
                let access_token: string | null = null;

                this.store.select(selectAccessToken).pipe(take(1)).subscribe((token) => {
                    access_token = token;
                });

                if (access_token) {
                    // Modify the request to include the token
                    request = this.addTokenHeaderToRequest(request, access_token);
                    next.handle(request).pipe(
                        tap((event:HttpEvent<any>)=>{
                            if( event instanceof HttpResponse){
                                console.log('private url request processed successfuly')
                            }
                        }),
                        catchError((error: HttpErrorResponse) => {
                            if (error instanceof ProgressEvent) {
                                console.error('Server not responding, please check your connectivity');
                                return throwError(() => error);
                            } else if (error.status === 401) {
                                // Access token is expired, trying to refresh it.
                                let refresh_token: string | null = null;
                                this.store.select(selectRefreshToken).pipe(
                                    take(1),
                                    tap((token_token) => {
                                        refresh_token = token_token;
                                    })
                                ).subscribe();

                                if (refresh_token) {
                                    // Refreshing the access token
                                    this.handleRefreshToken(refresh_token);
                                    let new_access_token: string | null = null;
                                    this.store.select(selectAccessToken).pipe(
                                        take(1),
                                        tap((access_token) => {
                                            new_access_token = access_token;
                                        })
                                    ).subscribe();

                                    if (new_access_token) {
                                        request = this.addTokenHeaderToRequest(request, new_access_token);
                                        return next.handle(request).pipe(
                                            tap((event: HttpEvent<any>) => {
                                                if (event instanceof HttpResponse) {
                                                    console.log('Private URL request processed successfully after token regeneration');
                                                }
                                            }),
                                            catchError((error: HttpErrorResponse) => {
                                                if (error instanceof ProgressEvent) {
                                                    console.error('Server not responding, please check your connectivity');
                                                    return throwError(() => error);
                                                } else {
                                                    console.error(error.message);
                                                    return throwError(() => error);
                                                }
                                            })
                                        );
                                    }
                                } else {
                                    // No refresh token available, disconnecting user.
                                    this.store.dispatch(logout());
                                    return throwError(() => new Error('Unauthorized'));
                                }
                            }
                            console.error(error.message);
                            return throwError(() => error);
                        })
                    )
                } else {
                    // No token, user not authenticated - Redirect or handle unauthorized requests
                    this.store.dispatch(logout())
                }
            }
        }

        // Default behavior for other requests
        return next.handle(request);
    }
    handleRefreshToken(refresh_token: never) {
        this.store.select(selectIsRefreshingToken).pipe(
            takeLast(1),
            tap((refresh_token_state: boolean)=>{
                if (!refresh_token_state){
                    this.store.dispatch(refreshTokenRequest({ refresh_token }))
                    this.authService.refreshToken(refresh_token).pipe(
                        
                       map((refreshTokenResponse)=>{
                        this.store.dispatch(refreshTokenSuccess({refreshTokenResponse}))
                       }),
                       catchError((error: HttpErrorResponse)=>{
                         if (error instanceof ProgressEvent){
                            console.error('Server not responding, please check your connectivity')
                            this.store.dispatch(logout())
                            return throwError(()=> error)
                         } else {
                                console.log(error.message)
                                this.store.dispatch(logout())
                                 return throwError(()=> error)
                         }
                       })
                    )
                }else if (refresh_token_state) {
                    this.store.select(selectIsRefreshingToken).pipe(
                        filter(isRefreshing => isRefreshing === false),
                        take(1),
                        tap((isRefreshing)=>{
                            console.log('waited until isRefreshing updated to ', isRefreshing)
                            // do nothing
                        })
                    )
                }
            })
        )
    }

    private addTokenHeaderToRequest(request: HttpRequest<any>, access_token: string) {
        console.log('adding token to the request header')
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${access_token}`,
            },
        });
    }
}
