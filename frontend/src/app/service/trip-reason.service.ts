import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base.service";
import {TripReason} from "../model/trip-reason";

@Injectable({
  providedIn: 'root'
})
export class TripReasonService extends BaseService<TripReason>  {

  constructor(
    public override http: HttpClient
  ) {
    super(http);
    this.entityName = "trip-reasons";
  }

}
