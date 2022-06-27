import {Vehicle} from "./vehicle";
import {Partner} from "./partner";
import {TripReason} from "./trip-reason";

export class Destination {
  _id: string | number = 0;
  date: string = '';
  vehicle: Vehicle = new Vehicle();
  from_partner: Partner = new Partner();
  to_partner: Partner = new Partner();
  trip_type: TripReason = new TripReason();
  distance: number = 0;
}
