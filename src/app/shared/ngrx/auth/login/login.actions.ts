import {createAction, props} from '@ngrx/store'

export interface User {
  id: string;
  username: string;
  roles?: string[];
}
export interface AuthLoginResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface AuthRefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface AuthLoginRequest {
  username: string;
  password: string;
}
export const loginRequest = createAction('[Auth] Login Request', props<{ credentials: AuthLoginRequest }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ loginSuccessResponse: AuthLoginResponse }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
export const refreshTokenRequest = createAction('[Auth] Refresh Token Request', props<{ refresh_token: string }>());
export const refreshTokenSuccess = createAction('[Auth] Refresh Token Success', props<{ refreshTokenResponse: AuthRefreshTokenResponse }>());
export const refreshTokenFailure = createAction('[Auth] Refresh Token Failure', props<{ error: string }>());
export const logout = createAction('[Auth] Logout');