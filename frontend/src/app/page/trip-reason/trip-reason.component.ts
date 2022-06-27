import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ITableColumn, ConfigService } from 'src/app/service/config.service';
import {TripReason} from "../../model/trip-reason";
import {TripReasonService} from "../../service/trip-reason.service";

@Component({
  selector: 'app-trip-reason',
  templateUrl: './trip-reason.component.html',
  styleUrls: ['./trip-reason.component.scss']
})
export class TripReasonComponent implements OnInit {


  tableColumns: ITableColumn[] = this.config.tripReasonColumns;
  list$: Observable<TripReason[]> = this.tripReasonService.getAll();

  entity: string = 'Trip Reason';

  constructor(
    private config: ConfigService,
    private tripReasonService: TripReasonService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSelectOne(entity: TripReason): void {
    this.router.navigate(['/', 'trip-reasons', entity._id])
  }

  onDeleteOne(entity: TripReason): void {
    this.tripReasonService.delete(entity).subscribe(
      () => this.list$ = this.tripReasonService.getAll()
    )
  }

}
