import { Component, OnInit } from '@angular/core';
import {VehicleService} from "../../service/vehicle.service";
import {Observable} from "rxjs";
import {Vehicle} from "../../model/vehicle";
import {PartnerService} from "../../service/partner.service";
import {DestinationService} from "../../service/destination.service";
import {UserService} from "../../service/user.service";
import {TripReasonService} from "../../service/trip-reason.service";
import {User} from "../../model/user";
import {Partner} from "../../model/partner";
import {TripReason} from "../../model/trip-reason";
import {Destination} from "../../model/destination";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private vehicleService: VehicleService,
    private partnerService: PartnerService,
    private tripReasonService: TripReasonService,
    private destinationService: DestinationService,
  ) { }

  ngOnInit(): void {
  }

  users$:  Observable<User[]> = this.userService.getAll()
  vehicles$:  Observable<Vehicle[]> = this.vehicleService.getAll()
  partners$:  Observable<Partner[]> = this.partnerService.getAll()
  tripReasons$:  Observable<TripReason[]> = this.tripReasonService.getAll()
  destinations$:  Observable<Destination[]> = this.destinationService.getAll()

}
