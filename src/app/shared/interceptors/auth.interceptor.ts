import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { BehaviorSubject, catchError, Observable, take, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { selectRefreshToken, selectToken } from '../ngrx/auth/login/login.selectors';

import { logout } from '../ngrx/auth/login/login.actions';

export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private store: Store,
    private authService: AuthService,
  ) {}
  intercept(request: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> { 
    const publicUrls = [
      '/login',
      '/authentication/get-connected-user/',
      '/authentication/refresh-token/',
    ]
    const isPublicUrl = publicUrls.some(url => request.url.includes(url));  
    if (isPublicUrl) {
      return next.handle(request).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.status === 200 || event.status === 201) {
            
            }
          }
        }),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
    }
    // on va ajouter le token au header apartir du store.
    let authToken : string | null = null
    this.store.select(selectToken).pipe(take(1)).subscribe((token)=>{
      authToken = token
    })
    if (authToken) {
      // on va ajouter le token au request
      request = this.addToken(request,authToken)
    }
    return next.handle(request).pipe(tap((event : HttpEvent<any>)=>{
      if (event instanceof HttpResponse){
        if (event.status === 200 && !request.url.includes("refresh-token")){
            console.log("Operation OK with token")
        }
      }
    }), catchError((err:HttpErrorResponse)=>{
      // si une erreur se passe avec le token. on va tenter de rafraichir le token alors
      if (err.status===401 && authToken){
        return this.handle401Error(request,next)
      } else {
        return this.handleError(err)
      }
    }))
  }
  handle401Error(request: HttpRequest<any>, next: HttpHandler): any {
    if (this.isRefreshing == false){
      this.isRefreshing = true
      this.refreshTokenSubject.next(null)
      let refreshToken = this.store.select(selectRefreshToken)
      if (refreshToken){
        this.authService.refreshtoken(refreshToken).pipe(

          // stocker le token dans le store
          // ajouter le token au request 
          // next.handle the request
          this.refreshTokenSubject.next(token)

        )
      } else {
        this.isRefreshing = false
        this.store.dispatch(logout())
        console.log('connection expiré, veuillez reconnecter !')
      }
     
    } else if (this.isRefreshing){
      this.refreshTokenSubject.pipe(take(1)).subscribe((token) => {
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
      return next.handle(request).pipe(tap((event:HttpEvent<any>)=>{
        if (event instanceof HttpResponse){
          if (event.status === 200 && !request.url.includes("refresh-token")){
            console.log("Operation OK with token refreshed")
        }
        }
      }))
      });
    }
    
  }
  private addToken(request: HttpRequest<any>, authToken: never): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }
}