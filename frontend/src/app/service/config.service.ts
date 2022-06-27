import { Injectable } from '@angular/core';

export interface IMenuItem {
  link: string;
  title: string;
  icon?: string;
}

export interface ITableColumn {
  title: string;
  key: string;
  hidden?: boolean;
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

  tripReasonColumns: ITableColumn[] = [
    {key: "_id", title: "#"},
    {key: "trip_reason", title: "Trip Reason"},
    {key: "trip_type", title: "Trip Type"},
  ];

  partnerColumns: ITableColumn[] = [
    {key: "_id", title: "#"},
    {key: "country_code", title: "Country code"},
    {key: "state", title: "State"},
    {key: "postcode", title: "Postcode"},
    {key: "city", title: "City"},
    {key: "street", title: "Street"},
    {key: "house_number", title: "House number"},
  ];

  vehicleColumns: ITableColumn[] = [
    {key: "_id", title: "#"},
    {key: "plate_number", title: "Plate Number"},
    {key: "manufacturer", title: "Manufacturer"},
    {key: "model", title: "Model"},
    {key: "production_year", title: "Production Year"},
  ];

  destinationColumns: ITableColumn[] = [
    {key: "_id", title: "#"},
    {key: "date", title: "Date"},
    {key: "vehicle.plate_number", title: "Vehicle Plate Number"},
    {key: "from_partner._id", title: "From Partner ID"},
    {key: "to_partner._id", title: "To Partner ID"},
    {key: "distance", title: "Distance"},
    {key: "trip_type.trip_reason", title: "Trip Reason"},
  ];

  constructor() { }
}
