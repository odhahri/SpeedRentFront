import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'client', loadChildren: () => import('./client/client.routes').then(r => r.CLIENT_ROUTES) }

];
