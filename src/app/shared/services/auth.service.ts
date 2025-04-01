import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthLoginRequest, AuthLoginResponse, AuthRefreshTokenResponse } from '../ngrx/auth/login/login.actions';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  refreshToken(refresh_token: string): Observable<AuthRefreshTokenResponse> {
    return this.http.post<AuthRefreshTokenResponse>( '/refresh-token/', refresh_token);
  }
  constructor(private http: HttpClient) {}

  loginUser(credentials: AuthLoginRequest): Observable<AuthLoginResponse> {
    return this.http.post<AuthLoginResponse>( '/login/', credentials);
  }

}

