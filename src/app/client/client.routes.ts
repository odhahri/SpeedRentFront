import { Routes } from '@angular/router';
import { ClientContainerComponent } from './client-container/client-container.component';
import { ClientHomeComponent } from './pages/visitor/client-home/client-home.component';
import { ClientAboutComponent } from './pages/visitor/client-about/client-about.component';
import { ClientContactComponent } from './pages/visitor/client-contact/client-contact.component';
import { ClientExploreCarsComponent } from './pages/visitor/client-explore-cars/client-explore-cars.component';
import { ClientIdentificationComponent } from './pages/visitor/client-identification/client-identification.component';
import { ClientManageAccountComponent } from './pages/client/client-manage-account/client-manage-account.component';
export const CLIENT_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  {
    path: '',
    component: ClientContainerComponent,
    children: [
      { path: 'home', component: ClientHomeComponent },
      { path: 'about', component: ClientAboutComponent },
      { path: 'contact', component: ClientContactComponent },
      { path: 'explore-cars', component: ClientExploreCarsComponent },
      { path: 'identification', component: ClientIdentificationComponent },
      { path: 'account-management', component: ClientManageAccountComponent },


    ]
  }
];