import { Component } from '@angular/core';
import { SidebarWrapperComponent } from "../../../shared/components/sidebar-wrapper/sidebar-wrapper.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {PagePanelComponent} from "../../../shared/components/page-panel/page-panel.component";

@Component({
  selector: 'app-client-management-container',
  imports: [SidebarWrapperComponent, CommonModule, RouterModule,PagePanelComponent],
  templateUrl: './client-management-container.component.html',
  standalone: true,
  styleUrl: './client-management-container.component.scss'
})
export class ClientManagementContainerComponent {


}
