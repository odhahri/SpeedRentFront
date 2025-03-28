import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientNavbarService {
  
  private navlinksSource = new BehaviorSubject<{ label: string, href: string }[]>([]);
  navlinks$ = this.navlinksSource.asObservable();

  private showNavbarSource = new BehaviorSubject<boolean>(true);
  showNavbar$ = this.showNavbarSource.asObservable();

  private navlinksMap: { [key: string]: { label: string, href: string }[] } = {
    '/client/home': [
      { label: 'Home', href: '/client/home' },
      { label: 'Features', href: '/client/features' },
    ],
    '/client/about': [
      { label: 'About Us', href: '/client/aboutus' },
      { label: 'Team', href: '/client/team' }
    ],
    '/client/contact': [
      { label: 'Contact Us', href: '/client/contactus' },
      { label: 'Support', href: '/client/support' }
    ]
  };

  private hiddenRoutes: string[] = [
    '/client/identification',
    '/client/special-page'
  ];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.navlinksSource.next(this.navlinksMap[event.url] || []);
      this.showNavbarSource.next(!this.hiddenRoutes.includes(event.url));
    });
  }
}
