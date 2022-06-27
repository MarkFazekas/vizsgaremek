import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base.service";
import {Destination} from "../model/destination";

@Injectable({
  providedIn: 'root'
})
export class DestinationService extends BaseService<Destination>  {

  constructor(
    public override http: HttpClient
  ) {
    super(http);
    this.entityName = "destinations";
  }

}
