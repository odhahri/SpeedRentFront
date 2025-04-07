import { Component, inject, OnInit, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientNavbarService } from '../../services/client-navbar.service';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/shared/ngrx/auth/login/login.selectors';
import { map } from 'rxjs';
import { User } from 'src/app/shared/ngrx/auth/login/login.actions';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-client-navbar',
  imports: [RouterModule,CommonModule],
  templateUrl: './client-navbar.component.html',
  styleUrl: './client-navbar.component.scss'
})
export class ClientNavbarComponent implements  OnInit  {
  navlinks$ :any
  private store: Store = inject(Store)
  isUserConnected: boolean = false
  connectedUserName: string  = ''
  constructor(private navbarService: ClientNavbarService) { 
    this.navlinks$ = this.navbarService.navlinks$;
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
    this.navlinks$.subscribe((links: any) => console.log("Navbar Links Updated:", links));
  }


}
