import { createReducer, on } from '@ngrx/store';
import { loginRequest, loginSuccess, loginFailure, refreshTokenRequest, refreshTokenSuccess, refreshTokenFailure, logout } from './login.actions';

export interface User {
  id: string;
  username: string;
  roles?: string[];
}

export interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  isLoginLoading: boolean;
  isTokenRefreshing: boolean;
  currentUser: User | null;
  loginError: string | null;
}

export const initialState: AuthState = {
  access_token: null,
  refresh_token: null,
  isLoginLoading: false,
  isTokenRefreshing: false,
  currentUser: null,
  loginError: null
};

const _authReducer = createReducer(
  initialState,
  on(loginRequest, (state) => ({
    ...state,
    isLoginLoading: true,
    loginError: null
  })),
  on(loginSuccess, (state, { loginSuccessResponse }) => ({
    ...state,
    access_token: loginSuccessResponse.access_token,
    refresh_token: loginSuccessResponse.refresh_token,
    loginError: null,
    currentUser: loginSuccessResponse.user,
    isLoginLoading: false
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    access_token: null,
    refresh_token: null,
    currentUser: null,
    loginError: error,
    isLoginLoading: false
  })),
  on(refreshTokenRequest, (state) => ({
    ...state,
    isTokenRefreshing: true
  })),
  on(refreshTokenSuccess, (state, { refreshTokenResponse }) => ({
    ...state,
    access_token: refreshTokenResponse.access_token,
    refresh_token: refreshTokenResponse.refresh_token,
    isTokenRefreshing: false
  })),
  on(refreshTokenFailure, (state, { error }) => ({
    ...state,
    access_token: null,
    refresh_token: null,
    loginError: error,
    isTokenRefreshing: false
  })),
  on(logout, () => initialState)
);

export function authReducer(state: AuthState | undefined, action: any) {
  return _authReducer(state, action);
}