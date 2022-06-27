import { Injectable } from '@angular/core';
// import { INgxTableColumn } from '../data-table/ngx-data-table/ngx-data-table.component';

export interface IMenuItem {
  link: string;
  title: string;
  icon?: string;
}

export interface ITableColumn {
  title: string;
  key: string;
  hidden?: boolean;
  pipes?: any[];
  pipeArgs?: any[][];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  sidebarMenu: IMenuItem[] = [
    {link: '/', title: 'Dashboard'},
    {link: '/users', title: 'Users'},
    {link: '/trip-reasons', title: 'Trip Reasons'},
    {link: '/partners', title: 'Partners'},
    {link: '/vehicles', title: 'Vehicles'},
    {link: '/destinations', title: 'Destinations',},
  ];

  userColumns: ITableColumn[] = [
    {key: "_id", title: "#"},
    {key: "first_name", title: "First Name"},
    {key: "last_name", title: "Last Name"},
    {key: "email", title: "Email"},
    {key: "password", title: "Password"},
    {key: "role", title: "Role"},
  ];

  constructor() { }
}
