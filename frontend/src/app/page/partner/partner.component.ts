import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ITableColumn, ConfigService } from 'src/app/service/config.service';
import {Partner} from "../../model/partner";
import {PartnerService} from "../../service/partner.service";

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit {

  tableColumns: ITableColumn[] = this.config.partnerColumns;
  list$: Observable<Partner[]> = this.partnerService.getAll();

  entity: string = 'Partner';

  constructor(
    private config: ConfigService,
    private partnerService: PartnerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSelectOne(entity: Partner): void {
    this.router.navigate(['/', 'partners', entity._id])
  }

  onDeleteOne(entity: Partner): void {
    this.partnerService.delete(entity).subscribe(
      () => this.list$ = this.partnerService.getAll()
    )
  }

}
