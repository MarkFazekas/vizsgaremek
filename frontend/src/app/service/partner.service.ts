import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base.service";
import {Partner} from "../model/partner";

@Injectable({
  providedIn: 'root'
})
export class PartnerService extends BaseService<Partner>  {

  constructor(
    public override http: HttpClient
  ) {
    super(http);
    this.entityName = "partners";
  }

}
