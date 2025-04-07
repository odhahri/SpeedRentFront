import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { RequestInterceptor, requestInterceptorFn } from './shared/interceptors/auth.interceptor';
import { authReducer } from './shared/ngrx/auth/login/login.reducers';
import { AuthEffects } from './shared/ngrx/auth/login/login.effects';
import { AuthService } from './shared/services/auth.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { localStorageSyncReducer } from './shared/ngrx/auth/login/store-persistance/localstorageSyncReducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
    // Configurer le router
    provideRouter(routes),

    // Configurer le client HTTP et l'intercepteur
    provideHttpClient(
      withFetch(),
      withInterceptors([requestInterceptorFn]) // Utilise la fonction d'adaptation
    ),

    // Configurer NgRx Store
    provideStore({
      auth: authReducer // Enregistre le réducteur pour l'authentification,
      
    },
    { metaReducers: [localStorageSyncReducer] }),

    // Configurer NgRx Effects
    provideEffects([AuthEffects]),

    // Configurer NgRx Store DevTools (pour le débogage, en développement uniquement)
    provideStoreDevtools({
      maxAge: 25, // Nombre maximum d'actions à conserver
      logOnly: false, // Permet d'utiliser les outils de débogage
    }),



    // Configurer les animations (nécessaires pour Toastr)
    provideAnimations(),

    // Fournir le service AuthService
    AuthService,
    RequestInterceptor,
  ]
};