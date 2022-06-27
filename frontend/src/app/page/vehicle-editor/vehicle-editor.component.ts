import { Component, OnInit } from '@angular/core';
import {Observable, of, switchMap} from "rxjs";
import {FieldBase} from "../../dynamic-form/model/field-base";
import {ActivatedRoute, Router} from "@angular/router";
import {InputField} from "../../dynamic-form/model/input-field";
import {Validators} from "@angular/forms";
import {Vehicle} from "../../model/vehicle";
import {VehicleService} from "../../service/vehicle.service";

@Component({
  selector: 'app-vehicle-editor',
  templateUrl: './vehicle-editor.component.html',
  styleUrls: ['./vehicle-editor.component.scss']
})
export class VehicleEditorComponent implements OnInit {

  route = 'vehicles';
  entity$: Observable<Vehicle> = this.ar.params.pipe(
    switchMap(params => {
      if (params.id === '0') {
        return of(new Vehicle());
      }
      return this.entityService.get(params.id);
    })
  );
  entity: Vehicle = new Vehicle();

  fields: FieldBase<any>[] = [];
  showForm: boolean = false;

  constructor(
    private entityService: VehicleService,
    private ar: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.entity$.subscribe(
      entity => {
        this.entity = entity;
        this.setForm();
        this.showForm = true;
      }
    );
  }

  setForm(): void {
    this.fields = [
      new InputField({key: '_id', label: '', type: 'hidden', value: this.entity._id}),
      new InputField({
        key: 'plate_number', label: 'Plate Number', type: 'text', value: this.entity.plate_number as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Plate Number must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'manufacturer', label: 'Manufacturer', type: 'text', value: this.entity.manufacturer as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Manufacturer must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'model', label: 'Model', type: 'text', value: this.entity.model as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Model must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'production_year', label: 'Production Year', type: 'number', value: this.entity.production_year as number,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Model must be between 1 and 30 characters.'
      }),
    ];
  }

  onSave(entity: Vehicle): void {

    if (entity._id == 0) {
      this.entityService.create(entity).subscribe(
        () => this.router.navigate([this.route])
      );
    } else {
      this.entityService.update(entity).subscribe(
        () => this.router.navigate([this.route])
      );
    }
  }

}

