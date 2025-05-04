export interface RouteInfo {
  url: string;
  label: string;
  icon?: string;
}

export type RouteObject = {
  [key: string]: RouteInfo;
};

export const CLIENT_PUBLIC_ROUTES: RouteObject = {
  CLIENT_HOME: { url: '/client/home', label: 'Home' },
  CLIENT_ABOUT: { url: '/client/about', label: 'About Us' },
  CLIENT_CONTACT: { url: '/client/contact', label: 'Contact' },
  CLIENT_IDENTIFICATION: { url: '/client/identification', label: 'Identification' },
};

export const CLIENT_MANAGEMENT_ROUTES: RouteObject = {
  CLIENT_MANAGEMENT_ACCOUNT: { url: '/client/client-management/account', label: 'My Account', icon:'account_circle' },
  CLIENT_MANAGEMENT_DOCS: { url: '/client/client-management/documents', label: 'Documents', icon:'library_books' },
  CLIENT_MANAGEMENT_PAY: { url: '/client/client-management/payement', label: 'Payements', icon:'payments' },
  CLIENT_MANAGEMENT_RESERVATIONS: { url: '/client/client-management/reservations', label: 'Reservations', icon:'handshake' }
};

export const CLIENT_NAV_LINKS: RouteObject = {
  CLIENT_HOME: { url: '/client/home', label: 'Home' },
  CLIENT_ABOUT_US: { url: '/client/about', label: 'About Us' },
  CLIENT_CONTACT_US: { url: '/client/contact', label: 'Contact Us' },
  CLIENT_EXPLORE_CARS:{ url: '/client/explore-cars', label: 'Explore Cars' },
};

export const CLIENT_NAVBAR_HIDDEN_ROUTES: RouteObject = {
  IDENTIFICATION: { url: '/client/identification', label: 'Identification' },
  CLIENT_MANAGEMENT_ROUTE: { url: '/client/client-management', label: 'Account Management Route' },

  ...CLIENT_MANAGEMENT_ROUTES
};
