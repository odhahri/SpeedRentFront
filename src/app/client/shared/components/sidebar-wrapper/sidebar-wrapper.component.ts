import {Component, inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {CLIENT_MANAGEMENT_ROUTES} from '../../utils/client-links';


@Component({
  selector: 'app-sidebar-wrapper',
  imports: [CommonModule, RouterModule, MatIconModule, MatTooltipModule],
  standalone: true,
  providers:[],
  templateUrl: './sidebar-wrapper.component.html',
  styleUrl: './sidebar-wrapper.component.scss',
})
export class SidebarWrapperComponent {
  isClosed = false;
  menuItems:any
  constructor() {
    this.menuItems = Object.values(CLIENT_MANAGEMENT_ROUTES);
  }

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }
}
