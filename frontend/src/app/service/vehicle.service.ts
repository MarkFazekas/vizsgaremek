import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Vehicle} from "../model/vehicle";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends BaseService<Vehicle>  {

  constructor(
    public override http: HttpClient
  ) {
    super(http);
    this.entityName = "vehicles";
  }

}
