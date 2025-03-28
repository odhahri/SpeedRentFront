import { Component, OnInit, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientNavbarService } from '../../services/client-navbar.service';
@Component({
  selector: 'app-client-navbar',
  imports: [RouterModule],
  templateUrl: './client-navbar.component.html',
  styleUrl: './client-navbar.component.scss'
})
export class ClientNavbarComponent implements  OnInit  {
  navlinks$ :any

  constructor(private navbarService: ClientNavbarService) { 
    this.navlinks$ = this.navbarService.navlinks$;

  }

  ngOnInit() {
    this.navlinks$.subscribe((links: any) => console.log("Navbar Links Updated:", links));
  }


}
