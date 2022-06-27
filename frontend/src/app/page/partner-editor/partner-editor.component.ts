import {Component, OnInit} from '@angular/core';
import {Observable, of, switchMap} from "rxjs";
import {FieldBase} from "../../dynamic-form/model/field-base";
import {ActivatedRoute, Router} from "@angular/router";
import {InputField} from "../../dynamic-form/model/input-field";
import {Validators} from "@angular/forms";
import {Partner} from "../../model/partner";
import {PartnerService} from "../../service/partner.service";

@Component({
  selector: 'app-partner-editor',
  templateUrl: './partner-editor.component.html',
  styleUrls: ['./partner-editor.component.scss']
})
export class PartnerEditorComponent implements OnInit {

  route = 'partners';
  entity$: Observable<Partner> = this.ar.params.pipe(
    switchMap(params => {
      if (params.id === '0') {
        return of(new Partner());
      }
      return this.entityService.get(params.id);
    })
  );
  entity: Partner = new Partner();

  fields: FieldBase<any>[] = [];
  showForm: boolean = false;

  constructor(
    private entityService: PartnerService,
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
        key: 'country_code', label: 'Country Code', type: 'text', value: this.entity.country_code as string,
        validators: [Validators.pattern(/^[A-Z]{2}$/)],
        errorMessage: 'The Country Code must be between 2 characters and should only contains uppercase English letters.'
      }),
      new InputField({
        key: 'state', label: 'State', type: 'text', value: this.entity.state as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The State must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'postcode', label: 'Postcode', type: 'text', value: this.entity.postcode as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Postcode must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'city', label: 'City', type: 'text', value: this.entity.city as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The City must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'street', label: 'Street', type: 'text', value: this.entity.street as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The Street must be between 1 and 30 characters.'
      }),
      new InputField({
        key: 'house_number', label: 'House Number', type: 'text', value: this.entity.house_number as string,
        validators: [Validators.minLength(1), Validators.pattern(/^.{1,30}$/)],
        errorMessage: 'The House Number must be between 1 and 30 characters.'
      }),
    ];
  }

  onSave(entity: Partner): void {

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
