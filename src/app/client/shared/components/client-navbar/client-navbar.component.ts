import { Component, inject, OnInit, } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ClientNavigationService } from '../../services/client-navigation.service';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/shared/ngrx/auth/login/login.selectors';
import { map } from 'rxjs';
import { logout, User } from 'src/app/shared/ngrx/auth/login/login.actions';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {CLIENT_NAV_LINKS} from '../../utils/client-links';

@Component({
  selector: 'app-client-navbar',
  imports: [RouterModule, CommonModule, NgbDropdownModule],
  templateUrl: './client-navbar.component.html',
  standalone: true,
  styleUrl: './client-navbar.component.scss'
})
export class ClientNavbarComponent implements  OnInit  {
  private store: Store = inject(Store)
  navbarItems = Object.values(CLIENT_NAV_LINKS); // Dynamically load navbar items

  isUserConnected: boolean = false
  connectedUserName: string  = ''
  constructor(private navbarService: ClientNavigationService, private router: Router) {
    this.store.select(selectCurrentUser).pipe(map((connectedUser:User |null)=>{
      if (connectedUser == null){
        return false
      } else {
        this.connectedUserName = connectedUser.data.user_infos.name
        return true
      }
    })).subscribe((isConnected:boolean)=>{
      this.isUserConnected = isConnected
    })

  }

  ngOnInit() {
  }

  navigateTo(url:string){
    this.router.navigate([url])
  }

  logout(){
    this.store.dispatch(logout())
  }

}
