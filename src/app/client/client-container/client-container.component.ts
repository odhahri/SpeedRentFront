import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientNavbarComponent } from "../shared/components/client-navbar/client-navbar.component";
import { ClientFooterComponent } from "../shared/components/client-footer/client-footer.component";
import { ClientNavbarService } from "../shared/services/client-navbar.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-container',
  imports: [RouterOutlet, ClientNavbarComponent, ClientFooterComponent,CommonModule ],
  templateUrl: './client-container.component.html',
  styleUrl: './client-container.component.scss'
})


export class ClientContainerComponent {

  showNavbar$;

  constructor(private navbarservice: ClientNavbarService) {
    this.showNavbar$ = this.navbarservice.showNavbar$;  
  }
  

}
