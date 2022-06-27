import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldBase } from '../model/field-base';

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {

  constructor() { }

  toFormGroup(fieldList: FieldBase<any>[]): FormGroup {
    const group: {[propname: string]: any} = {};

    if (fieldList) {
      fieldList.forEach( item => {
        group[item.key] = new FormControl(item.value, item.validators || []);
      });
    }

    return new FormGroup(group);
  }
}
