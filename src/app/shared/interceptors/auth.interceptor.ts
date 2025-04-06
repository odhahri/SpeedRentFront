import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { publicUrls, privateUrls } from './utils/routes.policy';
import { selectAccessToken, selectIsRefreshingToken, selectRefreshToken } from '../ngrx/auth/login/login.selectors';
import { logout, refreshTokenRequest, refreshTokenSuccess } from '../ngrx/auth/login/login.actions';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private store = inject(Store);
  private authService = inject(AuthService);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  publicUrls: string[] = publicUrls;
  privateUrls: string[] = privateUrls;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Traiter les URLs publiques (pas besoin de token)
    if (this.publicUrls.includes(request.url)) {
      console.log('this is a public url: '+ request.url)

      return next.handle(request).pipe(
        tap((response: HttpEvent<any>) => {
          if (response instanceof HttpResponse) {
          }
        }),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
    }

    // Traiter les URLs privées (token requis)
    return this.store.select(selectAccessToken).pipe(
      
      switchMap((access_token) => {
        if (this.privateUrls.includes(request.url) && !access_token) {
          console.log(access_token)
          this.store.dispatch(logout());
          this.router.navigate(['/login']);
          return throwError(() => new Error('Unauthorized'));
        }

        if (access_token) {
          request = this.addTokenHeaderToRequest(request, access_token);
        }

        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401 && this.privateUrls.includes(request.url)) {
              return this.handleAuthError(error, request, next);
            }
            return this.handleError(error);
          })
        );
      })
    );
  }

  private handleAuthError(error: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.store.select(selectRefreshToken).pipe(
        take(1),
        switchMap((refresh_token) => {
          if (!refresh_token) {
            this.isRefreshing = false;
            this.store.dispatch(logout());
            this.router.navigate(['/login']);
            return throwError(() => new Error('No refresh token available'));
          }

          return this.handleRefreshToken(refresh_token).pipe(
            switchMap((new_access_token) => {
              this.isRefreshing = false;
              this.refreshTokenSubject.next(new_access_token);
              return next.handle(this.addTokenHeaderToRequest(request, new_access_token));
            }),
            catchError((error) => {
              this.isRefreshing = false;
              this.store.dispatch(logout());
              this.router.navigate(['/login']);
              return throwError(() => error);
            })
          );
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap((token) => next.handle(this.addTokenHeaderToRequest(request, token!)))
      );
    }
  }

  private handleRefreshToken(refresh_token: string): Observable<string> {
    this.store.dispatch(refreshTokenRequest({ refresh_token }));
    return this.authService.refreshToken( refresh_token ).pipe(
      tap((refreshTokenResponse) => {
        this.store.dispatch(refreshTokenSuccess({ refreshTokenResponse }));
      }),
      map((refreshTokenResponse) => refreshTokenResponse.access_token),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ProgressEvent) {
        } else {
        }
        return throwError(() => new Error('Token refresh failed'));
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ProgressEvent) {
    } else {
      switch (error.status) {
        case 400:
          break;
        case 401:
          break;
        case 404:
          break;
        case 500:
          console.log('this is 500 error')
          break;
        default:
      }
    }
    return throwError(() => error);
  }

  private addTokenHeaderToRequest(request: HttpRequest<any>, access_token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${access_token}`
      }
    });
  }

  
}
export const requestInterceptorFn: HttpInterceptorFn = (req, next) => {
  const interceptor = inject(RequestInterceptor);
  const adaptedNext: HttpHandler = {
    handle: next
  };
  return interceptor.intercept(req, adaptedNext);
};