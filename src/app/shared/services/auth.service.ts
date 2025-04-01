import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authloginRequest, authloginResponse, authRefreshTokenResponse } from '../ngrx/auth/login/login.actions';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  refreshToken(refresh_token: string): Observable<authRefreshTokenResponse> {
    return this.http.post<authRefreshTokenResponse>( '/refresh-token/', refresh_token);
  }
  constructor(private http: HttpClient) {}

  loginUser(credentials: authloginRequest): Observable<authloginResponse> {
    return this.http.post<authloginResponse>( '/login/', credentials);
  }

}

