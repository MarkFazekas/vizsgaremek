import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ITableColumn, ConfigService } from 'src/app/service/config.service';
import {Vehicle} from "../../model/vehicle";
import {VehicleService} from "../../service/vehicle.service";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  tableColumns: ITableColumn[] = this.config.vehicleColumns;
  list$: Observable<Vehicle[]> = this.vehicleService.getAll();

  entity: string = 'Vehicle';

  constructor(
    private config: ConfigService,
    private vehicleService: VehicleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSelectOne(entity: Vehicle): void {
    this.router.navigate(['/', 'vehicles', entity._id])
  }

  onDeleteOne(entity: Vehicle): void {
    this.vehicleService.delete(entity).subscribe(
      () => this.list$ = this.vehicleService.getAll()
    )
  }

}
