import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { AuthLoginRequest, AuthLoginResponse, AuthRefreshTokenResponse, User } from '../ngrx/auth/login/login.actions';
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

  connectedUser(): Observable<User> {
    return this.http.get<any>(`${this.api_entry}/${this.api_auth_url}/connected-user/`).pipe(
      map((response) => {
        return {
          data: {
            user_id: response.data.user_id,
            user_infos: {
              name: response.data.user_infos.name,
              preferred_username: response.data.user_infos.preferred_username,
              email: response.data.user_infos.email,
            },
            user_assigned_role_name: response.data.user_assigned_roles[0].name,
          },
        };
      })
    );
  }
  

  loginUser(credentials: AuthLoginRequest): Observable<AuthLoginResponse> {
    return this.http
      .post<any>(`${this.api_entry}/${this.api_auth_url}/signin/`, credentials)
      .pipe(
        map((response) => {
          return {
            user:  response.data.user,
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
          };
        })
      )
        
      
  }

}

