import { ActionReducer, Action } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  if (typeof window === 'undefined') {
    // SSR or non-browser environment: skip syncing
    return reducer;
  }

  return localStorageSync({
    keys: ['auth'],
    rehydrate: true,
  })(reducer);
}
