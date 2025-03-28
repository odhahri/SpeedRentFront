import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './login.reducers';

export const selectLoginState = createFeatureSelector<AuthState>('auth');
export const selectToken = createSelector(
  selectLoginState,
  (state) => state.access_token
);
export const selectRefreshToken = createSelector(
  selectLoginState,
  (state) => state.refresh_token
);
export const selectIsLoginLoading = createSelector(
  selectLoginState,
  (state) => state.isLoginLoading
);
export const selectCurrentUser = createSelector(
  selectLoginState,
  (state) => state.currentUser
);
