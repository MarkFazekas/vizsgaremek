import { Component, OnInit } from '@angular/core';
import {Validators} from "@angular/forms";
import {Observable, of, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {InputField} from "../../dynamic-form/model/input-field";
import {FieldBase} from "../../dynamic-form/model/field-base";
import {TripReasonService} from "../../service/trip-reason.service";
import {TripReason} from "../../model/trip-reason";

@Component({
  selector: 'app-trip-reason-editor',
  templateUrl: './trip-reason-editor.component.html',
  styleUrls: ['./trip-reason-editor.component.scss']
})
export class TripReasonEditorComponent implements OnInit {

  route = 'trip-reasons';
  entity$: Observable<TripReason> = this.ar.params.pipe(
    switchMap(params => {
      if (params.id === '0') {
        return of(new TripReason());
      }
      return this.entityService.get(params.id);
    })
  );
  entity: TripReason = new TripReason();

  fields: FieldBase<any>[] = [];
  showForm: boolean = false;

  constructor(
    private entityService: TripReasonService,
    private ar: ActivatedRoute,
    private router: Router,
  ) { }

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
      new InputField({key: 'trip_reason', label: 'Trip Reason', type: 'text', value: this.entity.trip_reason as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Trip Reason of must be between 1 and 30 characters.'}),
      new InputField({key: 'trip_type', label: 'Trip Type', type: 'text', value: this.entity.trip_type as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Trip Type of must be between 1 and 30 characters.'}),
    ];
  }
  onSave(entity: TripReason): void {

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
