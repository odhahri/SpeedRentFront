import {Component, OnInit, OnDestroy, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientNavbarComponent } from "../shared/components/client-navbar/client-navbar.component";
import { ClientFooterComponent } from "../shared/components/client-footer/client-footer.component";
import { ClientNavigationService } from "../shared/services/client-navigation.service";
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-client-container',
  imports: [RouterOutlet, ClientNavbarComponent, ClientFooterComponent, CommonModule],
  templateUrl: './client-container.component.html',
  standalone: true,
  providers: [ClientNavigationService],
  styleUrl: './client-container.component.scss'
})
export class ClientContainerComponent implements OnInit, OnDestroy {
  showNavbar$!: Observable<boolean>;

  private subscription!: Subscription;
  private navigationService = inject(ClientNavigationService)
  constructor() {
    this.showNavbar$ = this.navigationService.showNavbar$;
  }

  ngOnInit() {
    this.subscription = this.showNavbar$.subscribe((data: boolean) => {
      console.log('showNavbar value:', data);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}


