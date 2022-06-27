import {Component, OnInit} from '@angular/core';
import {first, Observable, of, switchMap} from "rxjs";
import {FieldBase} from "../../dynamic-form/model/field-base";
import {ActivatedRoute, Router} from "@angular/router";
import {InputField} from "../../dynamic-form/model/input-field";
import {Validators} from "@angular/forms";
import {Destination} from "../../model/destination";
import {DestinationService} from "../../service/destination.service";

@Component({
  selector: 'app-destination-editor',
  templateUrl: './destination-editor.component.html',
  styleUrls: ['./destination-editor.component.scss']
})
export class DestinationEditorComponent implements OnInit {

  route = 'destinations';
  entity$: Observable<Destination> = this.ar.params.pipe(
    switchMap(params => {
      if (params.id === '0') {
        return of(new Destination());
      }
      return this.entityService.get(params.id);
    })
  );
  entity: Destination = new Destination();

  fields: FieldBase<any>[] = [];
  showForm: boolean = false;

  constructor(
    private entityService: DestinationService,
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
        key: 'date', label: 'Date', type: 'text', value: this.entity.date as string,
        validators: [Validators.minLength(1), Validators.pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)],
        errorMessage: 'The Date must be in ISO8601 DateTime format. Example: 2000-10-03T05:06:36.000Z'
      }),
      new InputField({
        key: 'distance', label: 'Distance', type: 'number', value: this.entity.distance as number,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Distance must be between 1 and 30 characters.'
      }),

      new InputField({key: 'vehicle._id', label: '', type: 'hidden', value: this.entity.vehicle._id}),
      new InputField({
        key: 'vehicle.plate_number',
        label: 'Vehicle Plate Number',
        type: 'text',
        value: this.entity.vehicle.plate_number as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Plate Number must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'vehicle.manufacturer',
        label: 'Vehicle Manufacturer',
        type: 'text',
        value: this.entity.vehicle.manufacturer as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Manufacturer must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'vehicle.model', label: 'Vehicle Model', type: 'text', value: this.entity.vehicle.model as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Model must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'vehicle.production_year',
        label: 'Vehicle Production Year',
        type: 'number',
        value: this.entity.vehicle.production_year as number,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Model must be between 1 and 30 characters.'
      }),

      new InputField({key: 'from_partner._id', label: '', type: 'hidden', value: this.entity.from_partner._id}),
      new InputField({
        key: 'from_partner.country_code',
        label: 'From Partner Country Code',
        type: 'text',
        value: this.entity.from_partner.country_code as string,
        validators: [Validators.pattern(/^[A-Z]{2}$/)],
        errorMessage: 'The Country Code must be between 2 characters and should only contains uppercase English letters.'
      }),
      new InputField({
        key: 'from_partner.state',
        label: 'From Partner State',
        type: 'text',
        value: this.entity.from_partner.state as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The State must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'from_partner.postcode',
        label: 'From Partner Postcode',
        type: 'text',
        value: this.entity.from_partner.postcode as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Postcode must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'from_partner.city',
        label: 'From Partner City',
        type: 'text',
        value: this.entity.from_partner.city as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The City must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'from_partner.street',
        label: 'From Partner Street',
        type: 'text',
        value: this.entity.from_partner.street as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Street must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'from_partner.house_number',
        label: 'From Partner House Number',
        type: 'text',
        value: this.entity.from_partner.house_number as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The House Number must be between 1 and 30 characters.'
      }),

      new InputField({key: 'to_partner._id', label: '', type: 'hidden', value: this.entity.to_partner._id}),
      new InputField({
        key: 'to_partner.country_code',
        label: 'To Partner Country Code',
        type: 'text',
        value: this.entity.to_partner.country_code as string,
        validators: [Validators.pattern(/^[A-Z]{2}$/)],
        errorMessage: 'The Country Code must be between 2 characters and should only contains uppercase English letters.'
      }),
      new InputField({
        key: 'to_partner.state', label: 'To Partner State', type: 'text', value: this.entity.to_partner.state as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The State must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'to_partner.postcode',
        label: 'To Partner Postcode',
        type: 'text',
        value: this.entity.to_partner.postcode as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Postcode must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'to_partner.city', label: 'To Partner City', type: 'text', value: this.entity.to_partner.city as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The City must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'to_partner.street',
        label: 'To Partner Street',
        type: 'text',
        value: this.entity.to_partner.street as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Street must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'to_partner.house_number',
        label: 'To Partner House Number',
        type: 'text',
        value: this.entity.to_partner.house_number as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The House Number must be between 1 and 30 characters.'
      }),

      new InputField({key: 'trip_type._id', label: '', type: 'hidden', value: this.entity.trip_type._id}),
      new InputField({
        key: 'trip_type.trip_reason',
        label: 'Trip Reason',
        type: 'text',
        value: this.entity.trip_type.trip_reason as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Trip Reason of must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'trip_type.trip_type', label: 'Trip Type', type: 'text', value: this.entity.trip_type.trip_type as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Trip Type of must be between 1 and 30 characters.'
      }),
    ];
  }

  onSave(entity: any): void {
    if (entity._id == 0) {
      this.entityService.create(this.reCreateEntity(entity,true)).subscribe(
        () => this.router.navigate([this.route])
      );
    } else {
      this.entityService.update(this.reCreateEntity(entity,false)).subscribe(
        () => this.router.navigate([this.route])
      );
    }
  }

  reCreateEntity(entity: any, null_id: boolean): any {
    const returnValue = {};
    console.log(entity)
    for (let key in entity) {
      this.deepDataSetter(returnValue, key, entity[key], null_id);
    }
    console.log(returnValue)
    return returnValue
  }

  deepDataSetter(container: any, path: string, value: any, null_id: boolean, first_level: boolean = true): void {
    if (path.includes(".")) {
      const firstContainer = path.substr(0, path.indexOf("."));
      if ((firstContainer in container) === false) {
        container[firstContainer] = {};
      }

      this.deepDataSetter(container[firstContainer], path.substr(path.indexOf(".") + 1), value, null_id, false);
    } else {
      if (null_id && path === '_id' && !first_level) {
        // container[path] = null;
      } else {
        container[path] = value;
      }
    }
  }

}
