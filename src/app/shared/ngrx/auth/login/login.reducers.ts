import { createReducer, on } from "@ngrx/store";
import { loginFailure, loginLoading, loginRequest, loginSuccess, logout, refreshTokenFailure, refreshTokenRequest, refreshTokenSuccess, secondaryloginFailure, secondaryloginSuccess } from "./login.actions";

export interface AuthState {
    access_token: string | null;
    refresh_token: string | null;
    loginError: any | null;
    currentUser: any | null;
    isLoginLoading:boolean
  }
  
  export const initialState: AuthState = {
    access_token: null,
    refresh_token: null,
    loginError: null,
    currentUser: null,
    isLoginLoading:false
  };
  
  const _authReducer = createReducer(
    initialState,
    on(loginRequest, (state) => {
      return {
        ...state,
        loginError: null,
        access_token: null,
        refresh_token: null,
        currentUser: null,
        isLoginLoading:true
      };
    }),
    on(loginLoading, (state, { isLoginLoading }) => {
        return {
          ...state,
          isLoginLoading:isLoginLoading
        };
      }),
      on(loginSuccess, (state, { loginSuccessResponse }) => {
        return {
          ...state,
          access_token: loginSuccessResponse.results.access_token,
          refresh_token: loginSuccessResponse.results.refresh_token,
          loginError: null,
          currentUser: loginSuccessResponse.user,
          isLoginLoading:false
        };
      }),
      on(secondaryloginSuccess, (state, { loginSuccessResponse }) => {
        return {
          ...state,
          access_token: loginSuccessResponse.results.access_token,
          refresh_token: loginSuccessResponse.results.refresh_token,
          loginError: null,
          currentUser: loginSuccessResponse.user,
        };
      }),
    
      on(secondaryloginFailure, (state, { error }) => {
        return {
          ...state,
          loginError: error,
          access_token: null,
          refresh_token: null,
          currentUser: null,
        };
      }),
    
      on(loginFailure, (state, { error }) => {
        return {
          ...state,
          loginError: error,
          access_token: null,
          refresh_token: null,
          currentUser: null,
          isLoginLoading:false
        };
      }),
    
      on(logout, (state) => {
        return {
          ...state,
          access_token: null,
          refresh_token: null,
          currentUser: null,
          isLoginLoading:false
        };
      }),
      on(refreshTokenRequest, (state) => {
        return {
          ...state,
          loginError: null,
          access_token: null,
          refresh_token: null,
        };
      }),
      on(refreshTokenSuccess, (state, { response }) => {
        return {
          ...state,
          access_token: response.results.access_token,
          refresh_token: response.results.refresh_token,
          loginError: null,
        };
      }),
      on(refreshTokenFailure, (state, { error }) => {
        return {
          ...state,
          loginError: error,
          access_token: null,
          refresh_token: null,
        };
      })
    );
    
    export function authReducer(state: any, action: any) {
      return _authReducer(state, action);
    }