import { createAction, props } from '@ngrx/store';
export interface AuthLoginResponse {
  results: any;
  user: any;
}
export interface AuthLoginRequest {
  username: string;
  password: string;
}
export interface RefreshTokenResponse {
  results: any;
}
export interface RefreshTokenRequest {
  refresh_token: string;
}
export const loginRequest = createAction(
  'Login Request',
  props<{ credentials: AuthLoginRequest }>()
);
export const loginLoading = createAction(
  'Login Loading',
  props<{isLoginLoading:boolean}>()
)
export const loginSuccess = createAction(
  'Login Success',
  props<{ loginSuccessResponse: AuthLoginResponse }>()
);
export const secondaryloginSuccess = createAction(
  ' Secondary Login Success',
  props<{ loginSuccessResponse: AuthLoginResponse }>()
);
export const loginFailure = createAction(
  'Login Failure',
  props<{ error: string }>()
);
export const secondaryloginFailure = createAction(
  'Secondary Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('Logout');

export const refreshTokenRequest = createAction(
  'RefreshToken Request',
  props<{ request: RefreshTokenRequest }>()
);

export const refreshTokenSuccess = createAction(
  'RefreshToken Success',
  props<{ response: RefreshTokenResponse }>()
);

export const refreshTokenFailure = createAction(
  'RefreshToken Failure',
  props<{ error: string }>()
);
