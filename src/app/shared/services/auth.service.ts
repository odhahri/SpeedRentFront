import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthLoginRequest, AuthLoginResponse, AuthRefreshTokenResponse } from '../ngrx/auth/login/login.actions';
import { environment } from '../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private api_entry: string = environment.api_entry;
  private api_auth_url : string = 'identification'
  refreshToken(refresh_token: string): Observable<AuthRefreshTokenResponse> {
    return this.http.post<AuthRefreshTokenResponse>( `${this.api_entry}/${this.api_auth_url}/refresh-token/`, refresh_token);
  }
  constructor(private http: HttpClient) {}

  loginUser(credentials: AuthLoginRequest): Observable<AuthLoginResponse> {
    return this.http
      .post<any>(`${this.api_entry}/${this.api_auth_url}/signin/`, credentials)
      .pipe(
        map((response: any) => {
          const mappedResponse: AuthLoginResponse = {
            user: response.data.user ?? {}, // if user exists inside data
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
          };
          return mappedResponse;
        })
      );
  }

}

