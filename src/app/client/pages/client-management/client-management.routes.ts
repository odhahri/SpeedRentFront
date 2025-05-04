import { Routes } from '@angular/router';
import { ClientManagementContainerComponent } from './client-management-container/client-management-container.component';
import { ClientAccountComponent } from './client-account/client-account.component';
import { ClientPayementComponent } from './client-payement/client-payement.component';
import { ClientDocumentsComponent } from './client-documents/client-documents.component';
import {ClientReservationsComponent} from './client-reservations/client-reservations.component';
export const CLIENT_MANAGEMENT_ROUTES: Routes = [
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  {
    path: '',
    component: ClientManagementContainerComponent,
    children: [
      { path: 'account', component: ClientAccountComponent },
      { path: 'reservations', component: ClientReservationsComponent },
      { path: 'documents', component: ClientDocumentsComponent },
      { path: 'payement', component: ClientPayementComponent },






    ]
  }
];
