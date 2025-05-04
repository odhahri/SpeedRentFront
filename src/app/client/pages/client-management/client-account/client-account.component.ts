import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {FormsModule} from '@angular/forms';
import {Select} from 'primeng/select';
import {InputText} from 'primeng/inputtext';
import {InputNumber} from 'primeng/inputnumber';
import {Tab, TabList, Tabs, TabsModule} from 'primeng/tabs';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {FloatLabel} from 'primeng/floatlabel';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-client-account',
  imports: [MatTabsModule, InputGroup, TabsModule, RouterModule, CommonModule, InputGroupAddon, FormsModule, Select, InputText, InputNumber, Tabs, TabList, Tab, MatIcon, FloatLabel],
  templateUrl: './client-account.component.html',
  styleUrl: './client-account.component.scss'
})


export class ClientAccountComponent {
  text1: string | undefined;

  text2: string | undefined;

  number: string | undefined;

  selectedCity: City | undefined;
  tabs = [
    { route: 'dashboard', label: 'Dashboard', icon: 'pi pi-home' },
    { route: 'transactions', label: 'Transactions', icon: 'pi pi-chart-line' },
    { route: 'products', label: 'Products', icon: 'pi pi-list' },
    { route: 'messages', label: 'Messages', icon: 'pi pi-inbox' }
  ];
  cities: City[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];
}
