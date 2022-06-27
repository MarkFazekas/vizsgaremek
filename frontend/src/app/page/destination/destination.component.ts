import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ITableColumn, ConfigService } from 'src/app/service/config.service';
import {Destination} from "../../model/destination";
import {DestinationService} from "../../service/destination.service";

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {


  tableColumns: ITableColumn[] = this.config.destinationColumns;
  list$: Observable<Destination[]> = this.destinationService.getAll();

  entity: string = 'Destination';

  constructor(
    private config: ConfigService,
    private destinationService: DestinationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSelectOne(entity: Destination): void {
    this.router.navigate(['/', 'destinations', entity._id])
  }

  onDeleteOne(entity: Destination): void {
    this.destinationService.delete(entity).subscribe(
      () => this.list$ = this.destinationService.getAll()
    )
  }

}
