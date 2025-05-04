import {Injectable, OnDestroy} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import { filter } from 'rxjs/operators';
import {CLIENT_NAVBAR_HIDDEN_ROUTES} from '../utils/client-links';



@Injectable()

export class ClientNavigationService implements OnDestroy {
  private routerSubscription: Subscription
  private showNavbarSource = new BehaviorSubject<boolean>(true);
  showNavbar$ = this.showNavbarSource.asObservable();

  constructor(private router: Router) {
    const hiddenRouteUrls: string[] = Object.values(CLIENT_NAVBAR_HIDDEN_ROUTES).map(route => route.url);

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showNavbarSource.next(!hiddenRouteUrls.includes(event.url));
    });
  }
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
