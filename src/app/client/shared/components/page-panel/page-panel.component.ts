import {Component, OnInit} from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {BadgeModule} from 'primeng/badge';
import {AvatarModule} from 'primeng/avatar';
import {InputTextModule} from 'primeng/inputtext';
import {CommonModule} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {OverlayBadge} from 'primeng/overlaybadge';

@Component({
  selector: 'app-page-panel',
  imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, CommonModule, OverlayBadge],
  templateUrl: './page-panel.component.html',
  styleUrl: './page-panel.component.scss'
})
export class PagePanelComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },

    ];
  }
}
